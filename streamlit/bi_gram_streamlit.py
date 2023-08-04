import io
import csv
import networkx as nx
import matplotlib.pyplot as plt
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from itertools import combinations
from collections import defaultdict
import streamlit as st

dataset1_file = './dataset_1.csv'
dataset3_file = './dataset_3.csv'

def load_csv(file_path):
    with open(file_path, 'r') as file:
        reader = csv.reader(file)
        data = list(reader)
    return data

dataset1 = load_csv(dataset1_file)
dataset3 = load_csv(dataset3_file)

feature_categories = {}
for row in dataset3[1:]:
    feature = row[0]
    category = row[1]
    feature_categories[feature] = category

category_names = list(set(feature_categories.values()))

dataset1_categories = []
for row in dataset1[1:]:
    categories = [feature_categories[feature] for feature, value in zip(dataset1[0][1:], row[1:]) if
                  value == '1' and feature in feature_categories]
    dataset1_categories.append(categories)

n = 2
min_frequency = 8

graph = nx.Graph()

co_occurrence_counts = defaultdict(lambda: defaultdict(int))

for categories in dataset1_categories:
    country_categories = set(categories)
    for combination in combinations(country_categories, n):
        co_occurrence_counts[combination][tuple(categories)] += 1

for combination, counts_per_country in co_occurrence_counts.items():
    count = sum(counts_per_country.values())
    if count >= min_frequency:
        graph.add_edge(*combination, weight=count)


def generate_graph(min_frequency):
    graph = nx.Graph()

    co_occurrence_counts = defaultdict(lambda: defaultdict(int))

    for categories in dataset1_categories:
        country_categories = set(categories)
        for combination in combinations(country_categories, n):
            co_occurrence_counts[combination][tuple(categories)] += 1

    for combination, counts_per_country in co_occurrence_counts.items():
        count = sum(counts_per_country.values())
        if count >= min_frequency:
            graph.add_edge(*combination, weight=count)

    # plt.figure(figsize=(12, 8))
    # plt.figure(figsize=(16, 10))  # Set a larger figsize for the graph
    num_nodes = len(graph.nodes)
    label_lengths = [len(node) for node in graph.nodes]
    max_label_length = max(label_lengths)
    figure_width = max(20, num_nodes * 0.7, max_label_length * 0.7)
    figure_height = max(15, num_nodes * 0.5, max_label_length * 0.5)

    plt.figure(figsize=(figure_width, figure_height))
    pos = nx.spring_layout(graph, seed=2017)
    # pos['Current Study Program'] = (0.1, 0.5)  # Adjust the position of 'current study program'
    # pos['Previous Academic Performance'] = (0.9, 0.5)  # Adjust the position of 'previous study performance'
    edge_weights = nx.get_edge_attributes(graph, 'weight')
    max_edge_weight = max(edge_weights.values())  # Get the maximum edge weight

    nx.draw_networkx_edges(graph, pos, alpha=0.5, edge_color='#d78a76',
                           width=[2 + 6 * edge_weights[edge] / max_edge_weight for edge in graph.edges()])
    nx.draw_networkx_nodes(graph, pos, node_color='#e70e02', node_size=130, alpha=0.55)
    node_labels = {node: " ".join(node) for node in graph.nodes()}
    nx.draw_networkx_labels(graph, pos, labels=node_labels, font_size=18, font_color='black', font_family='sans-serif',
                            alpha=1)
    plt.axis('off')
    return plt.gcf()  # Return the figure object

# Streamlit app code
page_bg_img = '''
<style>

header{visibility: hidden;}
.stAlert{ visibility: hidden; }
.stApp { background: url(http://localhost:3000/static/media/chart-back.4125ee2c.svg), no-repeat;}
</style>
'''
hide_streamlit_style = """
<style>
#MainMenu {visibility: hidden;}
footer {visibility: hidden;}
</style>

"""
st.markdown(hide_streamlit_style, unsafe_allow_html=True)

st.markdown(page_bg_img, unsafe_allow_html=True)

initial_min_frequency = 11
min_frequency = st.slider('Minimum Frequency', 1, 20, initial_min_frequency)

# Generate the graph
with st.spinner():
    graph = generate_graph(min_frequency)

# Display the graph using st.pyplot
    st.pyplot(graph)
st.success('success')