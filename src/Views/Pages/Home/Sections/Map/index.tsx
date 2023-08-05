import './index.scss';
import {instructor, our_chart} from '@src/Data/home.data';
import separator from '@assets/Images/home/partner-separator.svg';
import { Col, Grid, Row } from 'rsuite';
import UNICEF from '@assets/Images/home/UNICEF.png';
import DSI from '@assets/Images/home/DSI.png';
import HiveLab from '@assets/Images/home/hivelab-log.png';
import MapIMG from '@assets/Images/home/MAP_B.png';
import {SwiperSlide} from "@components/Swiper/Swiper";
const Map = () => {
	return (
		<div className='instructor-layout'>
			<Grid>

				<Row style={{paddingLeft: '5%', display: 'flex', alignItems: 'center' }} className=''>

					<Col md={8} >
						<h3 style={{color: '#f5715f' , fontSize : '17px', fontWeight: 'bold', lineHeight : '21px'}}> Varied Features in ML Models for Different Countries </h3>

						<p>  Our findings highlight a disheartening reality: health and behavioral features, which could significantly contribute to identifying at-risk students, have not received the attention they rightfully deserve. By overlooking these critical factors, we risk overlooking opportunities to intervene and provide much-needed support to students facing challenges that profoundly impact their educational journey</p>

					</Col>
					<Col md={20} >
						<img src={MapIMG} />

					</Col>


				</Row>
			</Grid>
		</div>
	);
};

export default Map;
