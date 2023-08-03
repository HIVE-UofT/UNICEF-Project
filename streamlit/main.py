import streamlit as st
from PIL import Image
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import learning_curve
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
import numpy as np


# Global variables
st.set_page_config(layout="wide")
image_width = 600
use_column_width = True
page_bg_img = '''
<style>

header{visibility: hidden;}

.stApp {background: #f7f7f8}
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

df_ptg = pd.read_csv('./models/datasets/Portugal_Undergrad_dataset.csv')
df_features = pd.read_csv('./FeatureExtraction.csv')

# Collect the Non-empty values for each variable
Countrylst = list(df_features[df_features.Country.notnull()].Country.unique())
# DatasetAvalst = list(df_features[df_features.Dataset_available.notnull()].Dataset_available.unique())
Educationlst = list(df_features[df_features.Education_level.notnull()].Education_level.unique())

container = st.container()
col1, col2 = container.columns(2)

df = pd.read_csv("./models/datasets/Portugal_Undergrad_dataset.csv")  # read a CSV file inside the 'data" folder next to 'app.py'# add a title
col2.write(df)

selected_variables = col1.multiselect("Select Variables for Training", df_ptg.columns, default=[])
selected_variables.append("Target")
# Filter the dataset based on selected variables
df_selected = df_ptg[selected_variables]

# Define the available models
model_options = {
    "Logistic Regression": LogisticRegression(max_iter=200),
    "K-Nearest Neighbors": KNeighborsClassifier(n_neighbors=3),
    "Decision Tree": DecisionTreeClassifier(),
    "Random Forest": RandomForestClassifier(n_estimators=200),
    "Support Vector Machine": SVC()
}

# Create the multiselect widget to select the models
selected_models = col1.multiselect("Select models", list(model_options.keys()))

# Split the data into train and test sets
x_train, x_test, y_train, y_test = train_test_split(df_selected.drop('Target', axis=1), df_selected['Target'], test_size=0.2)
col1_1, col1_2 = col1.columns(2)
# Train and plot the learning curves for the selected models
if col1.button("Train Models"):

    for selected_model in selected_models:
        classifier = model_options[selected_model]

        # Compute the learning curve
        train_sizes, train_scores, test_scores = learning_curve(classifier, x_train, y_train, cv=5)

        # Calculate the mean accuracy across all cross-validation folds
        accuracy = np.mean(test_scores, axis=1)

        # Plot the learning curve
        plt.plot(train_sizes, accuracy, marker='o', label=selected_model)

    plt.title('Learning Curves')
    plt.xlabel('Training examples')
    plt.ylabel('Accuracy')
    plt.legend(loc='best')
    plt.grid(True)
    plt.savefig("ModelTraining.png", dpi=300, bbox_inches="tight")


    # Display the learning curve plot
    col1_1.pyplot(plt)
    col1_1.write("Comparison for selected models and selected variables")


    # Load the PNG image from file
    # Please change the path to you own path
    image_path = "./models/learning_curve_comparison_Portugal.png"
    image = open(image_path, "rb")
    image_bytes = image.read()

    # Display the image in Streamlit
    col1_2.image(image_bytes)
    col1_2.write("Overall Comparison")




