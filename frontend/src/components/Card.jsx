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
        <div className="card--container">
            {cource.map((item) => (
                <div className="card">
                    <div className="card--cover">{item.icon}</div>
                    <div className="card--title">
                        <h2>{item.title}</h2>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Card;
