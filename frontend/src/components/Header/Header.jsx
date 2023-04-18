import { AppContext } from "../../AppContext";
import { useContext } from 'react';
import './Header.css';

export const Header = () => {

    const appContext = useContext(AppContext);

    return <nav class="navbar navbar-expand-lg bg-info p-0">
                <div class="container-fluid">
                <a class="navbar-brand fs-3 text-dark" href="/">Hospital</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar1" aria-controls="navbar1" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbar1"> 
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0 header-list">
                            <li class="nav-item header-item">
                                <a class="nav-link text-dark" href="/surgeries">Surgeries</a>
                            </li>
                            <li class="nav-item header-item">
                                <a class="nav-link text-dark" href="/surgeons">Surgeons</a>
                            </li>
                            <li class="nav-item header-item">
                                <a class="nav-link text-dark" href="/new-surgery">Create Surgery</a>
                            </li>
                        </ul>
                    <span class="navbar-text bg-info text-dark ps-0 ms-0">
                        {appContext.userType}: @{appContext.username}
                    </span>
                    <button className="btn btn-danger me-2" onClick={() => {appContext.setUsername(undefined);
                                            appContext.setUserType(undefined);} }>Logout</button>
                    </div>
                </div>
</nav>
}