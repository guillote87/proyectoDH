import React from 'react';
import image from '../assets/images/nicotine.png';
import List from './List';
import NotFound from "./NotFound"
import ContentWrapper from "./ContentWrapper"
import LastProductInDb from './LastProductInDb';
import ContentRowCenter from './ContentRowCenter';
import ContentRowData from './ContentRowData';

import { Link , Route, Switch } from 'react-router-dom';

function SideBar(props){

    return(
        <React.Fragment>
            {/*<!-- Sidebar -->*/}
            <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

                {/*<!-- Sidebar - Brand -->*/}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    <div className="sidebar-brand-icon">
                        <img className="w-100" src={image} alt="Digital House"/>
                    </div>
                </a>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider my-0"/>

                {/*<!-- Nav Item - Dashboard -->*/}
                <li className="nav-item active">
                    <Link className="nav-link" to="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard - Nicotine</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider"/>

                {/*<!-- Heading -->*/}
                <div className="sidebar-heading">Menu</div>

                {/*<!-- Nav Item - Pages -->*/}
                <li className="nav-item">
                <Link className="nav-link" to="/ContentRowData">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Pages</span>
                    </Link>
                </li>

                {/*<!-- Nav Item - Charts -->*/}
                <li className="nav-item">
                    <Link className="nav-link" to="/ContentRowCenter">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Producto Reciente</span></Link>
                </li>

                {/*<!-- Nav Item - Tables -->*/}
                <li className="nav-item nav-link">
                <Link className="nav-link" to="/List">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Productos</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block"/>
            </ul>
            {/*<!-- End of Sidebar -->*/}


            <Switch>
                <Route exact path="/">
                    <ContentWrapper/>
                </Route>
                <Route path="/List">
                    <List/>
                </Route>
                <Route path="/ContentRowCenter">
                    <ContentRowCenter />
                </Route>
                <Route path="/ContentRowData">
                    <ContentRowData/>
                </Route>
                <Route component={NotFound} />
            </Switch>
        </React.Fragment>
    )
}
export default SideBar;