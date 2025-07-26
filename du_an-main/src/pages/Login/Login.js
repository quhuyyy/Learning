import { Link } from "react-router-dom"
import clsx from "clsx"
import logoIUH from '../../images/Logo.png'
import PeopleLogin from '../../images/people-login.png'
import style from './Login.module.css'


function HomePage() {
    return (
        <div className={clsx("container-fluid", style.root)}>
            <div className="row">
                <div className="col-md-12 text-center mt-2">
                    <img src={logoIUH} alt='logo' className={style.logo}/>
                    <h1 className="mt-4">CÔNG CỤ DỰ ĐOÁN KẾT QUẢ HỌC TẬP <br />& GỢI Ý CẢI THIỆN CHO NGƯỜI HỌC</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 col-sm-12 text-center mt-4">
                    <img src={PeopleLogin} alt='logo' className={style.peopleLogin}/>
                </div>
                <div className="col-md-6 mt-4">
                    <div className={clsx(
                        style.borderLogin,
                    )}>
                        <h3 className={clsx(
                            style.loginTitle,
                            "text-center")}
                        >
                            ĐĂNG NHẬP
                        </h3>
                        <form action="">
                            <div className="row">
                                <div className="col-md-12">
                                    <label  className='mb-2' htmlFor="txtUsername">Tài khoản</label>
                                    <input type='text' className="form-control"></input>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-12">
                                    <label  className='mb-2' htmlFor="txtUsername">Mật khẩu</label>
                                    <input  type='password' className="form-control"></input>
                                    <div className="text-end">
                                        <a href="/" className={clsx(
                                            style.forgetPassword
                                        )}>Quên mật khẩu?</a>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-lg-6">
                                    <div className="mt-lg-2 mt-md-0">
                                        <a href="/" className={clsx(
                                            style.forgetPassword)}
                                        >
                                            Tạo tài khoản mới
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-6 text-end">
                                    <Link
                                        className={clsx(
                                            'btn',
                                            style.buttonLogin
                                            )}
                                        to="/"
                                    >
                                        Đăng nhập
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage