import { Link } from 'react-router-dom';

function Card({ title, description, image, link }) {
    return (
        <Link to={link} className="cardhome bg-white shadow-lg max-w-sm overflow-hidden p-5">
            <img className="w-full h-24" src={image} alt={title} />
            <div className="px-6 py-4">
                <div className=" font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">{description}</p>
            </div>
        </Link >
    );
}

export default Card;
