import { BiTask, BiPackage, BiMoneyWithdraw } from "react-icons/bi";
import img from "../assets/stats.png";
const cource = [
    {
        title: 'Total Services ',
        duration: '2 hrs',
        icon: <BiTask />
    },
    {
        title: 'Total Orders',
        duration: '2 hrs',
        icon: <BiPackage />
    },
    {
        title: ' Revenue',
        duration: '2 hrs',
        icon: <BiMoneyWithdraw />
    },
];

const Card = () => {
    return (
        <>
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
        <div>
        <center> <img style={{marginTop:"50px",borderRadius:"20px",maxWidth:"900px"}} src={img} alt="" /></center>   
            </div>
            </>
    );
};

export default Card;
