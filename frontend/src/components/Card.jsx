import { BiLogoHtml5, BiLogoAndroid, BiBuilding } from "react-icons/bi";

const cource = [
    {
        title: 'Total Services ',
        duration: '2 hrs',
        icon: <BiLogoHtml5 />
    },
    {
        title: 'Total Orders',
        duration: '2 hrs',
        icon: <BiLogoAndroid />
    },
    {
        title: ' Revenue',
        duration: '2 hrs',
        icon: <BiBuilding />
    },
];

const Card = () => {
    return(
        <div className="cardone--container">
            {cource.map((item) => (
                <div className="cardone">
                    <div className="cardone--cover">{item.icon}</div>
                    <div className="cardone--title">
                        <h2>{item.title}</h2>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Card;
