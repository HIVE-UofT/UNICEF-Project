import './index.scss';
import toronto from '@assets/Images/home/p3.svg';
import dalla from '@assets/Images/home/p4.svg';
import { ReactComponent as Separator } from '@assets/Images/home/partner-separator.svg';
import { HashLink } from 'react-router-hash-link';

const Footer = () => {
	return (
		<div className='footer'>
			<div className='footer-links'>
				<HashLink to={'/'}>Home</HashLink>
				<HashLink to={'/#about-us'}>About Us</HashLink>
				<HashLink to={'/#contact-us'}>Contact Us</HashLink>
			</div>
			<div className='footer-logos'>
				<img className='mr-8' src={toronto} alt='' />
				<Separator className='h-6 m-auto' />
				<img className='ml-8' src={dalla} alt='' />
			</div>
		</div>
	);
};

export default Footer;
