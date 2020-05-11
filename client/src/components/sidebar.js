import React from 'react'
import '../css/style.css'
const Sidebar = () =>{
    return (
<div>
        <input type="checkbox" id="check" />
        <label htmlFor="check">
        <i className="fas fa-bars" id="btn"></i>
        <i className="fas fa-times" id="cancel"></i>
        </label>
    <div className="sidebar">
        <header>My App</header>
        <ul>
        <li><a href="/register"><i className="fas fa-qrcode"></i>Registration</a></li>
        <li><a href="/login"><i className="fas fa-link"></i>Login</a></li>
        <li><a href="/changepassword"><i className="fas fa-stream"></i>Change Password</a></li>
        <li><a href="/forgetpassword"><i className="fas fa-calendar-week"></i>Forgot Password</a></li>
        <li><a href="/#"><i className="far fa-question-circle"></i>About</a></li>
        <li><a href="/#"><i className="fas fa-sliders-h"></i>Services</a></li>
        <li><a href="/#"><i className="far fa-envelope"></i>Contact</a></li>
        </ul>
    </div>
<section></section>
</div>
    )
}
export default Sidebar;

    