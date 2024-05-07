import React from "react";
import Header from "./Header";

const NavLinks = () => {
    const links = [{
        name: "Services", submenu: true, sublinks: [
            {
                Head: "Body Wash",
                sublink: [
                    { name: 'Scented', link: "/" },
                    { name: 'Unscented', link: "/" },
                    { name: 'Moisturizing', link: "/" },
                    {name:'Exfoliating',link:"/"},
                ]
            },
            {
                Head: "Full Service",
                sublink: [
                    { name: 'Inspection', link: "/" },
                    { name: 'Repairs', link: "/" },
                    { name: 'Cleaning', link: "/" },
                    {name:'Upgrades',link:"/"},
                ]
            },
            {
                Head: "Maintenance",
                sublink: [
                    { name: 'Routine', link: "/" },
                    { name: 'Emergency', link: "/" },
                    { name: 'Preventative', link: "/" },
                    {name:'Seasonal',link:"/"},
                ]
        },
    ] }];
    return (
        <>
            {links.map((link) =>(
            <div>
                <div className="px-3 text-left md:cursor-pointer group">
                    <h1 className="py-7">{link.name}</h1>
                        {link.submenu && (
                            <div>
                                <div className="absolute top-20 hidden group-hover:block hover-block">
                                    <div className="py-3">
                                        <div className="w-4 h-4 left absolute mt-1 bg-white rotate-45"></div>
                                        </div>
                                    <div className="bg-white p-3.5 grid grid-cols-2 gap-10">
                                    {
                                        link.sublinks.map((mysublinks) => (
                                            <div>
                                                <h1 className="text-lg font-semibold">{mysublinks.Head}</h1>
                                                {mysublinks.sublink.map((slink )=> (
                                                    <li className="text-sm text-gray-600 my-2.5">
                                                      <Link to={slink.link} className="hover:text-primary">{slink.name}</Link>
                                                    </li>
                                                ))}
                                            </div>
                                        ))}
                                </div>
                                </div>
                                </div>
                            
                    )}
                </div>
            </div>
            ))
            }
        </>
    )
}

export default NavLinks;