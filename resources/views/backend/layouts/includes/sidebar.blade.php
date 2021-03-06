<aside id="leftsidebar" class="sidebar">
    <ul class="nav nav-tabs">
        <li class="nav-item"><a class="nav-link active" href="{{route('index')}}"><i
                    class="zmdi zmdi-home m-r-5"></i>{{config('app.name')}}</a></li>
        {{--<li class="nav-item"><a class="nav-link" data-toggle="tab" href="{{route('dashboard')}}#user"><i
            class="zmdi zmdi-account m-r-5"></i>Agent</a></li>--}}
    </ul>
    <div class="tab-content">
        <div class="tab-pane stretchRight active" id="dashboard">
            <div class="menu">
                <ul class="list">
                    <li>
                        <div class="user-info">
                            <div class="image"><a href="#profile"><img
                                        src="{{asset('uploads/avatars/'.user()->avatar.'')}}" alt="User"></a></div>
                            <div class="detail">
                                <h4>{{user()->firstname}}</h4>
                                {{--<small>{{user()->role->first()->name}}</small>--}}
                            </div>
                            <a title="facebook" href="javascript:void(0);"><i class="zmdi zmdi-facebook"></i></a>
                            <a title="twitter" href="javascript:void(0);"><i class="zmdi zmdi-twitter"></i></a>
                            <a title="instagram" href="javascript:void(0);"><i class="zmdi zmdi-instagram"></i></a>
                        </div>
                    </li>
                    <li class="header">MAIN</li>
                    @if(Auth::user()->hasRole('Admin')|| Auth::user()->hasRole('Tenant'))
                    <li class=""><a href="{{route('visits',['role'=>strtolower(user()->roles->first()->name)])}}"><i
                                class="zmdi zmdi-city"></i><span>Shops Visited</span></a></li>
                    @endif
                    @if(Auth::user()->hasRole('Admin')||Auth::user()->hasRole('Landlord'))
                    <li class=""><a href="{{route('shops',['role'=>strtolower(user()->roles->first()->name)])}}"><i
                                class="zmdi zmdi-city"></i><span>Shops</span></a></li>
                    @endif
                    @if(Auth::user()->hasRole('Admin'))
                    <li class=""><a href="{{route('users',['role'=>strtolower(user()->roles->first()->name)])}}"><i
                                class="zmdi zmdi-accounts-outline"></i><span>Users</span></a></li>
                    <li class=""><a href="{{route('tenants',['role'=>strtolower(user()->roles->first()->name)])}}"><i
                                class="zmdi zmdi-accounts-outline"></i><span>Tenants</span></a></li>
                    <li class=""><a href="{{route('landlords',['role'=>strtolower(user()->roles->first()->name)])}}"><i
                                class="zmdi zmdi-accounts-outline"></i><span>Landlords</span></a></li>
                    @endif
                    <li class=""><a href="{{route('profile',['role'=>strtolower(user()->roles->first()->name)])}}"><i
                                class="zmdi zmdi-accounts-outline"></i><span>Profile</span></a></li>
                    {{--<li><a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-city"></i><span>Property</span></a>
                        <ul class="ml-menu">
                            <li><a href="property-list.html">Property List</a></li>
                            <li><a href="property-list3.html">3 Column</a></li>
                            <li><a href="property-list4.html">4 Column</a></li>
                            <li><a href="property-add.html">Add Property</a></li>
                            <li><a href="property-detail.html">Property Detail</a></li>
                        </ul>
                    </li>
                    <li><a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-city"></i><span>Types</span></a>
                        <ul class="ml-menu">
                            <li><a href="apartment.html">Apartment</a></li>
                            <li><a href="office.html">Office</a></li>
                            <li><a href="shop.html">Shop</a></li>
                            <li><a href="villa.html">Villa</a></li>
                        </ul>
                    </li>
                    <li><a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-accounts-outline"></i><span>Agents</span></a>
                        <ul class="ml-menu">
                            <li><a href="agent.html">All Agents</a></li>
                            <li><a href="add-agent.html">Add Agent</a></li>
                            <li><a href="profile.html">Agent Profile</a></li>
                            <li><a href="invoices.html">Agent Invoice</a></li>
                        </ul>
                    </li>
                    <li><a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-case-check"></i><span>Contract</span></a>
                        <ul class="ml-menu">
                            <li><a href="contract-add.html">Add New</a></li>
                            <li><a href="contract-list.html">List</a></li>
                        </ul>
                    </li>
                    <li><a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-apps"></i><span>App</span></a>
                        <ul class="ml-menu">
                            <li><a href="mail-inbox.html">Inbox</a></li>
                            <li><a href="chat.html">Chat</a></li>
                            <li><a href="events.html">Calendar</a></li>
                            <li><a href="contact.html">Contact list</a></li>
                            <li><a href="blog-dashboard.html">Blog</a></li>
                        </ul>
                    </li>
                    <li><a href="groups.html"><i class="zmdi zmdi-ungroup"></i><span>Groups</span></a>
                    <li><a href="file-dashboard.html"><i class="zmdi zmdi-file-text"></i><span>File Manager</span></a>
                    <li><a href="jvectormap.html"><i class="zmdi zmdi-map"></i><span>Site Location</span></a>
                    <li class="header">EXTRA COMPONENTS</li>
                    <li>
                        <a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-swap-alt"></i><span>User Interface (UI)</span></a>
                        <ul class="ml-menu">
                            <li><a href="ui_kit.html">UI KIT</a></li>
                            <li><a href="alerts.html">Alerts</a></li>
                            <li><a href="collapse.html">Collapse</a></li>
                            <li><a href="colors.html">Colors</a></li>
                            <li><a href="dialogs.html">Dialogs</a></li>
                            <li><a href="icons.html">Icons</a></li>
                            <li><a href="list-group.html">List Group</a></li>
                            <li><a href="media-object.html">Media Object</a></li>
                            <li><a href="modals.html">Modals</a></li>
                            <li><a href="notifications.html">Notifications</a></li>
                            <li><a href="progressbars.html">Progress Bars</a></li>
                            <li><a href="range-sliders.html">Range Sliders</a></li>
                            <li><a href="sortable-nestable.html">Sortable & Nestable</a></li>
                            <li><a href="tabs.html">Tabs</a></li>
                            <li><a href="waves.html">Waves</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-assignment"></i><span>Forms</span></a>
                        <ul class="ml-menu">
                            <li><a href="basic-form-elements.html">Basic Elements</a> </li>
                            <li><a href="advanced-form-elements.html">Advanced Elements</a> </li>
                            <li><a href="form-examples.html">Form Examples</a> </li>
                            <li><a href="form-validation.html">Form Validation</a> </li>
                            <li><a href="form-wizard.html">Form Wizard</a> </li>
                            <li><a href="form-editors.html">Editors</a> </li>
                            <li><a href="form-upload.html">File Upload</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-grid"></i><span>Tables</span></a>
                        <ul class="ml-menu">
                            <li><a href="normal-tables.html">Normal Tables</a></li>
                            <li><a href="jquery-datatable.html">Jquery Datatables</a></li>
                            <li><a href="editable-table.html">Editable Tables</a></li>
                            <li><a href="table-color.html">Tables Color</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-chart"></i><span>Charts</span> </a>
                        <ul class="ml-menu">
                            <li><a href="c3chart.html">C3 Chart</a></li>
                            <li><a href="morris.html">Morris</a></li>
                            <li><a href="flot.html">Flot</a></li>
                            <li><a href="chartjs.html">ChartJS</a></li>
                            <li><a href="sparkline.html">Sparkline</a></li>
                            <li><a href="jquery-knob.html">Jquery Knob</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-delicious"></i><span>Widgets</span></a>
                        <ul class="ml-menu">
                            <li><a href="widgets-app.html">Apps Widgetse</a></li>
                            <li><a href="widgets-data.html">Data Widgetse</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-lock"></i><span>Authentication</span></a>
                        <ul class="ml-menu">
                            <li><a href="sign-in.html">Sign In</a></li>
                            <li><a href="sign-up.html">Sign Up</a></li>
                            <li><a href="forgot-password.html">Forgot Password</a></li>
                            <li><a href="404.html">Page 404</a></li>
                            <li><a href="500.html">Page 500</a></li>
                            <li><a href="page-offline.html">Page Offline</a></li>
                            <li><a href="locked.html">Locked Screen</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="javascript:void(0);" class="menu-toggle"><i class="zmdi zmdi-copy"></i><span>Sample Pages</span></a>
                        <ul class="ml-menu">
                            <li><a href="blank.html">Blank Page</a></li>
                            <li><a href="image-gallery.html">Image Gallery</a></li>
                            <li><a href="timeline.html">Timeline</a></li>
                            <li><a href="pricing.html">Pricing</a></li>
                            <li><a href="search-results.html">Search Results</a></li>
                        </ul>
                    </li>
                    <li class="header">Extra</li>
                    <li>
                        <div class="progress-container progress-primary m-t-10">
                            <span class="progress-badge">Traffic this Month</span>
                            <div class="progress">
                                <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="67" aria-valuemin="0" aria-valuemax="100" style="width: 67%;">
                                    <span class="progress-value">67%</span>
                                </div>
                            </div>
                        </div>
                        <div class="progress-container progress-info">
                            <span class="progress-badge">Server Load</span>
                            <div class="progress">
                                <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="86" aria-valuemin="0" aria-valuemax="100" style="width: 86%;">
                                    <span class="progress-value">86%</span>
                                </div>
                            </div>
                        </div>
                    </li>--}}
                </ul>
            </div>
        </div>
        <div class="tab-pane stretchLeft" id="user">
            <div class="menu">
                <ul class="list">
                    <li>
                        <div class="user-info m-b-20 p-b-15">
                            <div class="image"><a href="profile.html"><img
                                        src="{{asset('templates/oreo/light/assets/images/profile_av.jpg')}}"
                                        alt="User"></a>
                            </div>
                            <div class="detail">
                                <h4>Michael</h4>
                                <small>Agent</small>
                            </div>
                            <a title="facebook" href="javascript:void(0);"><i class="zmdi zmdi-facebook"></i></a>
                            <a title="twitter" href="javascript:void(0);"><i class="zmdi zmdi-twitter"></i></a>
                            <a title="instagram" href="javascript:void(0);"><i class="zmdi zmdi-instagram"></i></a>
                            <p class="text-muted">795 Folsom Ave, Suite 600 San Francisco, CADGE 94107</p>
                            <div class="row">
                                <div class="col-4">
                                    <h6 class="mb-1">852</h6>
                                    <small>Deals</small>
                                </div>
                                <div class="col-4">
                                    <h6 class="mb-1">13k</h6>
                                    <small>Sales</small>
                                </div>
                                <div class="col-4">
                                    <h6 class="mb-1">234</h6>
                                    <small>Clients</small>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <small class="text-muted">Email address:</small>
                        <p>michael@gmail.com</p>
                        <hr>
                        <small class="text-muted">Phone:</small>
                        <p>+ 202-555-0191</p>
                        <hr>
                        <ul class="list-unstyled">
                            <li>
                                <div>Honesty & Integrity</div>
                                <div class="progress m-b-20">
                                    <div class="progress-bar l-blue " role="progressbar" aria-valuenow="89"
                                        aria-valuemin="0" aria-valuemax="100" style="width: 89%"><span
                                            class="sr-only">62% Complete</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div>Responsiveness</div>
                                <div class="progress m-b-20">
                                    <div class="progress-bar l-green " role="progressbar" aria-valuenow="56"
                                        aria-valuemin="0" aria-valuemax="100" style="width: 56%"><span
                                            class="sr-only">87% Complete</span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div>Local Knowledge</div>
                                <div class="progress m-b-20">
                                    <div class="progress-bar l-amber" role="progressbar" aria-valuenow="78"
                                        aria-valuemin="0" aria-valuemax="100" style="width: 78%"><span
                                            class="sr-only">32% Complete</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</aside>
