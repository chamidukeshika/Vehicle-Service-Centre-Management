import { useState } from "react";
import { BiTask, BiPackage, BiMoneyWithdraw } from "react-icons/bi";
import img from "../assets/stats.png";
import RecordsChart from "./RecordChart";
import Itemschart from "./ItemChart";

const cource = [
    {
        title: 'Services Analyze',
        duration: '2 hrs',
        icon: <BiTask />,
        chartComponent: <RecordsChart />
    },
    {
        title: 'Tools Analyze',
        duration: '2 hrs',
        icon: <BiPackage />,
        chartComponent: <Itemschart />
    },
    {
        title: ' Revenue',
        duration: '2 hrs',
        icon: <BiMoneyWithdraw />,
        chartComponent: null // No chart component for revenue
    },
];

const Card = () => {
    const [selectedChartIndex, setSelectedChartIndex] = useState(0); // Default: RecordsChart

    const handleCardClick = (index) => {
        setSelectedChartIndex(index);
    };

    return (
        <>
            <div className="cardone--container">
                {cource.map((item, index) => (
                    <div className={`cardone ${selectedChartIndex === index ? 'selected' : ''}`} key={index} onClick={() => handleCardClick(index)}>
                        <div className="cardone--cover">{item.icon}</div>
                        <div className="cardone--title">
                            <h2>{item.title}</h2>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                {cource[selectedChartIndex].chartComponent}
            </div>
        </>
    );
};

export default Card;
