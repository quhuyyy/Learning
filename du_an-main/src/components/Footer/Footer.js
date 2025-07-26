import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers, faLocationDot, faPhone, faEnvelope, faUsersRectangle, faUserGraduate } from "@fortawesome/free-solid-svg-icons";

import style from './Footer.module.css'
import clsx from "clsx";
import { useEffect } from "react";
import { actions, useStore } from "../../store";

function Footer() {

    const [state, dispatch] = useStore()

    const contacts = [
        { name: 'A_Team' },
        { name: 'Thành viên: ', value: "Lê Quốc Huy, Nguyễn Thành Trọng, Nguyễn Minh Phúc, Nguyễn Quốc Nhựt, Phạm Gia Khánh", icon: faUsersRectangle },
        { name: 'Địa chỉ: ', value: "Số 12 Nguyễn Văn Bảo, Phường 4, Quận Gò Vấp, Thành phố Hồ Chí Minh", icon: faLocationDot },
        { name: 'Điện thoại: ', value: "0328546227", icon: faPhone },
        { name: 'Email: ', value: "22642481.trong@student.iuh.edu.vn", icon: faEnvelope },
    ]

    const teachers = [
        { name: "PGS.TS Huỳnh Tường Nguyên", email: "huynhtuongnguyen@iuh.edu.vn", icon: faUserGraduate, icon2: faEnvelope },
        { name: "TS. Phạm Thị Thiết", email: "", icon: faUserGraduate, icon2: faEnvelope },
        { name: "ThS. Nguyễn Ngọc Lễ", email: "nguyenngocle@iuh.edu.vn", icon: faUserGraduate, icon2: faEnvelope },
    ]


    useEffect(() => {
        fetch('http://165.22.244.31:8000/api/analytics/', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data);

                dispatch(actions.setAccess(data))
            })
            .catch(error => console.log(error)
            )
    }, [])

    return (
        <div className={clsx("container-fluid", style.root)}>
            <div className={clsx("container-fluid pt-2 text-center")}>
                <div className="row">
                    <div className="col-md-6">
                        <h3>Liên hệ</h3>
                        <div>
                            <ul>
                                {contacts.map((item, index) => {
                                    console.log(item.icon);

                                    return ((item.name === "A_Team" &&
                                        <li key={index} className={clsx(style.contact, style.nameTeam)}><b>{item.name}{item.value}</b></li>
                                    ) || <li key={index} className={style.contact}>
                                            <FontAwesomeIcon icon={item.icon} />
                                            <b> {item.name}</b> {item.value}
                                        </li>)
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <h3>Cố vấn</h3>
                        <div>
                            <ul>
                                {teachers.map((item, index) => {
                                    return (
                                        <li key={index} className={style.contact}><FontAwesomeIcon icon={item.icon} /><b> {item.name}</b><br /><FontAwesomeIcon icon={item.icon2} /><b> Email: </b> {item.email}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <h3>Thống kê</h3>
                        <div>
                            <ul className={style.statistical}>
                                <li><FontAwesomeIcon icon={faUsers} /> <b>Số lượt  truy cập:</b> {state.access.analytics_data[0].event_count}</li>
                                <li><FontAwesomeIcon icon={faUser} /> <b>Số người dùng:</b> {state.access.analytics_data[0].active_users} </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;