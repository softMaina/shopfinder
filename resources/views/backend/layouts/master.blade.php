<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="RealEstate Admin Dashboard template, UI kit, Bootstrap 4x">
    <meta name="author" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}"/>
    <meta id="app-url" name="app-url" content="{{ request()->root() }}"/>

    <title>{{ config('app.name') }}</title>
    <link rel="icon" href="{{asset('templates/oreo/light/favicon.ico')}}" type="image/x-icon"> <!-- Favicon-->
    <link rel="stylesheet" href="{{asset('templates/oreo/assets/plugins/bootstrap/css/bootstrap.min.css')}}">
    <link rel="stylesheet" href="{{asset('templates/oreo/assets/plugins/charts-c3/plugin.css')}}"/>
    <link rel="stylesheet"
          href="{{asset('templates/oreo/assets/plugins/jvectormap/jquery-jvectormap-2.0.3.min.css')}}"/>
    <!-- Custom Css -->
    <link rel="stylesheet" href="{{asset('templates/oreo/light/assets/css/main.css')}}">
    <link rel="stylesheet" href="{{asset('templates/oreo/light/assets/css/color_skins.css')}}">
    @yield('styles')
</head>
<body class="theme-blue"><!-- theme-purple -->
<!-- Page Loader -->
<div class="page-loader-wrapper">
    <div class="loader">
        <div class="m-t-30"><img class="zmdi-hc-spin" src="{{asset('templates/oreo/assets/images/logo.svg')}}"
                                 width="48" height="48" alt="Oreo"></div>
        <p>Please wait...</p>
    </div>
</div>
<!-- Overlay For Sidebars -->
<div class="overlay"></div>

<!-- Top Bar -->
@include('backend.layouts.includes.navbar')

<!-- Left Sidebar -->
@include('backend.layouts.includes.sidebar')

<!-- Right Sidebar -->
<aside id="rightsidebar" class="right-sidebar">
    <ul class="nav nav-tabs">
        <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="index.html#setting"><i
                    class="zmdi zmdi-settings zmdi-hc-spin"></i></a></li>
        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="index.html#chat"><i
                    class="zmdi zmdi-comments"></i></a></li>
        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="index.html#activity">Activity</a></li>
    </ul>
    <div class="tab-content">
        <div class="tab-pane slideRight active" id="setting">
            <div class="slim_scroll">
                <div class="card">
                    <h6>Skins</h6>
                    <ul class="choose-skin list-unstyled">
                        <li data-theme="purple" class="active">
                            <div class="purple"></div>
                        </li>
                        <li data-theme="blue">
                            <div class="blue"></div>
                        </li>
                        <li data-theme="cyan">
                            <div class="cyan"></div>
                        </li>
                        <li data-theme="green">
                            <div class="green"></div>
                        </li>
                        <li data-theme="orange">
                            <div class="orange"></div>
                        </li>
                        <li data-theme="blush">
                            <div class="blush"></div>
                        </li>
                    </ul>
                </div>
                <div class="card theme-light-dark">
                    <h6>Left Menu</h6>
                    <button class="t-light btn btn-default btn-simple btn-round btn-block">Light</button>
                    <button class="t-dark btn btn-default btn-round btn-block">Dark</button>
                    <button class="m_img_btn btn btn-primary btn-round btn-block">Sidebar Image</button>
                </div>
                <div class="card">
                    <h6>General Settings</h6>
                    <ul class="setting-list list-unstyled">
                        <li>
                            <div class="checkbox">
                                <input id="checkbox1" type="checkbox">
                                <label for="checkbox1">Report Panel Usage</label>
                            </div>
                        </li>
                        <li>
                            <div class="checkbox">
                                <input id="checkbox2" type="checkbox" checked="">
                                <label for="checkbox2">Email Redirect</label>
                            </div>
                        </li>
                        <li>
                            <div class="checkbox">
                                <input id="checkbox3" type="checkbox" checked="">
                                <label for="checkbox3">Notifications</label>
                            </div>
                        </li>
                        <li>
                            <div class="checkbox">
                                <input id="checkbox4" type="checkbox" checked="">
                                <label for="checkbox4">Auto Updates</label>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="card">
                    <h6>Account Settings</h6>
                    <ul class="setting-list list-unstyled">
                        <li>
                            <div class="checkbox">
                                <input id="checkbox5" type="checkbox" checked="">
                                <label for="checkbox5">Offline</label>
                            </div>
                        </li>
                        <li>
                            <div class="checkbox">
                                <input id="checkbox6" type="checkbox" checked="">
                                <label for="checkbox6">Location Permission</label>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="card">
                    <h6>Information Summary</h6>
                    <div class="row m-b-20">
                        <div class="col-7">
                            <small class="displayblock">MEMORY USAGE</small>
                            <h5 class="m-b-0 h6">512</h5>
                        </div>
                        <div class="col-5">
                            <div class="sparkline" data-type="bar" data-width="97%" data-height="25px"
                                 data-bar-Width="5" data-bar-Spacing="3" data-bar-Color="#00ced1">8,7,9,5,6,4,6,8
                            </div>
                        </div>
                    </div>
                    <div class="row m-b-20">
                        <div class="col-7">
                            <small class="displayblock">CPU USAGE</small>
                            <h5 class="m-b-0 h6">90%</h5>
                        </div>
                        <div class="col-5">
                            <div class="sparkline" data-type="bar" data-width="97%" data-height="25px"
                                 data-bar-Width="5" data-bar-Spacing="3" data-bar-Color="#F15F79">6,5,8,2,6,4,6,4
                            </div>
                        </div>
                    </div>
                    <div class="row m-b-20">
                        <div class="col-7">
                            <small class="displayblock">DAILY TRAFFIC</small>
                            <h5 class="m-b-0 h6">25 142</h5>
                        </div>
                        <div class="col-5">
                            <div class="sparkline" data-type="bar" data-width="97%" data-height="25px"
                                 data-bar-Width="5" data-bar-Spacing="3" data-bar-Color="#78b83e">7,5,8,7,4,2,6,5
                            </div>
                        </div>
                    </div>
                    <div class="row m-b-40">
                        <div class="col-7">
                            <small class="displayblock">DISK USAGE</small>
                            <h5 class="m-b-0 h6">60.10%</h5>
                        </div>
                        <div class="col-5">
                            <div class="sparkline" data-type="bar" data-width="97%" data-height="25px"
                                 data-bar-Width="5" data-bar-Spacing="3" data-bar-Color="#457fca">7,5,2,5,6,7,6,4
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab-pane right_chat stretchLeft" id="chat">
            <div class="slim_scroll">
                <div class="card">
                    <div class="search">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Search...">
                            <span class="input-group-addon"><i class="zmdi zmdi-search"></i></span>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <h6>Recent</h6>
                    <ul class="list-unstyled">
                        <li class="online">
                            <a href="javascript:void(0);">
                                <div class="media">
                                    <img class="media-object "
                                         src="{{asset('templates/oreo/light/assets/images/xs/avatar4.jpg')}}" alt="">
                                    <div class="media-body">
                                        <span class="name">Sophia</span>
                                        <span class="message">There are many variations of passages of Lorem Ipsum available</span>
                                        <span class="badge badge-outline status"></span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="online">
                            <a href="javascript:void(0);">
                                <div class="media">
                                    <img class="media-object "
                                         src="{{asset('templates/oreo/light/assets/images/xs/avatar5.jpg')}}" alt="">
                                    <div class="media-body">
                                        <span class="name">Grayson</span>
                                        <span class="message">All the Lorem Ipsum generators on the</span>
                                        <span class="badge badge-outline status"></span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="offline">
                            <a href="javascript:void(0);">
                                <div class="media">
                                    <img class="media-object "
                                         src="{{asset('templates/oreo/light/assets/images/xs/avatar2.jpg')}}" alt="">
                                    <div class="media-body">
                                        <span class="name">Isabella</span>
                                        <span class="message">Contrary to popular belief, Lorem Ipsum</span>
                                        <span class="badge badge-outline status"></span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="me">
                            <a href="javascript:void(0);">
                                <div class="media">
                                    <img class="media-object "
                                         src="{{asset('templates/oreo/light/assets/images/xs/avatar1.jpg')}}" alt="">
                                    <div class="media-body">
                                        <span class="name">John</span>
                                        <span class="message">It is a long established fact that a reader</span>
                                        <span class="badge badge-outline status"></span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="online">
                            <a href="javascript:void(0);">
                                <div class="media">
                                    <img class="media-object "
                                         src="{{asset('templates/oreo/light/assets/images/xs/avatar3.jpg')}}" alt="">
                                    <div class="media-body">
                                        <span class="name">Alexander</span>
                                        <span class="message">Richard McClintock, a Latin professor</span>
                                        <span class="badge badge-outline status"></span>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="card">
                    <h6>Contacts</h6>
                    <ul class="list-unstyled">
                        <li class="offline inlineblock">
                            <a href="javascript:void(0);">
                                <div class="media">
                                    <img class="media-object "
                                         src="{{asset('templates/oreo/light/assets/images/xs/avatar10.jpg')}}" alt="">
                                    <div class="media-body">
                                        <span class="badge badge-outline status"></span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="offline inlineblock">
                            <a href="javascript:void(0);">
                                <div class="media">
                                    <img class="media-object "
                                         src="{{asset('templates/oreo/light/assets/images/xs/avatar6.jpg')}}" alt="">
                                    <div class="media-body">
                                        <span class="badge badge-outline status"></span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="offline inlineblock">
                            <a href="javascript:void(0);">
                                <div class="media">
                                    <img class="media-object "
                                         src="{{asset('templates/oreo/light/assets/images/xs/avatar7.jpg')}}" alt="">
                                    <div class="media-body">
                                        <span class="badge badge-outline status"></span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="offline inlineblock">
                            <a href="javascript:void(0);">
                                <div class="media">
                                    <img class="media-object "
                                         src="{{asset('templates/oreo/light/assets/images/xs/avatar8.jpg')}}" alt="">
                                    <div class="media-body">
                                        <span class="badge badge-outline status"></span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="offline inlineblock">
                            <a href="javascript:void(0);">
                                <div class="media">
                                    <img class="media-object "
                                         src="{{asset('templates/oreo/light/assets/images/xs/avatar9.jpg')}}" alt="">
                                    <div class="media-body">
                                        <span class="badge badge-outline status"></span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="online inlineblock">
                            <a href="javascript:void(0);">
                                <div class="media">
                                    <img class="media-object "
                                         src="{{asset('templates/oreo/light/assets/images/xs/avatar5.jpg')}}" alt="">
                                    <div class="media-body">
                                        <span class="badge badge-outline status"></span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="offline inlineblock">
                            <a href="javascript:void(0);">
                                <div class="media">
                                    <img class="media-object "
                                         src="{{asset('templates/oreo/light/assets/images/xs/avatar4.jpg')}}" alt="">
                                    <div class="media-body">
                                        <span class="badge badge-outline status"></span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="offline inlineblock">
                            <a href="javascript:void(0);">
                                <div class="media">
                                    <img class="media-object "
                                         src="{{asset('templates/oreo/light/assets/images/xs/avatar3.jpg')}}" alt="">
                                    <div class="media-body">
                                        <span class="badge badge-outline status"></span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="online inlineblock">
                            <a href="javascript:void(0);">
                                <div class="media">
                                    <img class="media-object "
                                         src="{{asset('templates/oreo/light/assets/images/xs/avatar2.jpg')}}" alt="">
                                    <div class="media-body">
                                        <span class="badge badge-outline status"></span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li class="offline inlineblock">
                            <a href="javascript:void(0);">
                                <div class="media">
                                    <img class="media-object "
                                         src="{{asset('templates/oreo/light/assets/images/xs/avatar1.jpg')}}" alt="">
                                    <div class="media-body">
                                        <span class="badge badge-outline status"></span>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="tab-pane slideLeft" id="activity">
            <div class="slim_scroll">
                <div class="card user_activity">
                    <h6>Recent Activity</h6>
                    <div class="streamline b-accent">
                        <div class="sl-item">
                            <img class="user rounded-circle"
                                 src="{{asset('templates/oreo/light/assets/images/xs/avatar4.jpg')}}" alt="">
                            <div class="sl-content">
                                <h5 class="m-b-0">Admin Birthday</h5>
                                <small>Jan 21 <a href="javascript:void(0);" class="text-info">Sophia</a>.</small>
                            </div>
                        </div>
                        <div class="sl-item">
                            <img class="user rounded-circle"
                                 src="{{asset('templates/oreo/light/assets/images/xs/avatar5.jpg')}}" alt="">
                            <div class="sl-content">
                                <h5 class="m-b-0">Add New Contact</h5>
                                <small>30min ago <a href="javascript:void(0);">Alexander</a>.</small>
                                <small><strong>P:</strong> +264-625-2323</small>
                                <small><strong>E:</strong> maryamamiri@gmail.com</small>
                            </div>
                        </div>
                        <div class="sl-item">
                            <img class="user rounded-circle"
                                 src="{{asset('templates/oreo/light/assets/images/xs/avatar6.jpg')}}" alt="">
                            <div class="sl-content">
                                <h5 class="m-b-0">Code Change</h5>
                                <small>Today <a href="javascript:void(0);">Grayson</a>.</small>
                                <small>The standard chunk of Lorem Ipsum used since the 1500s is reproduced</small>
                            </div>
                        </div>
                        <div class="sl-item">
                            <img class="user rounded-circle"
                                 src="{{asset('templates/oreo/light/assets/images/xs/avatar7.jpg')}}" alt="">
                            <div class="sl-content">
                                <h5 class="m-b-0">New Email</h5>
                                <small>45min ago <a href="javascript:void(0);" class="text-info">Fidel Tonn</a>.</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <h6>Recent Attachments</h6>
                    <ul class="list-unstyled activity">
                        <li>
                            <a href="javascript:void(0)">
                                <i class="zmdi zmdi-collection-pdf l-blush"></i>
                                <div class="info">
                                    <h4>info_258.pdf</h4>
                                    <small>2MB</small>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)">
                                <i class="zmdi zmdi-collection-text l-amber"></i>
                                <div class="info">
                                    <h4>newdoc_214.doc</h4>
                                    <small>900KB</small>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)">
                                <i class="zmdi zmdi-image l-parpl"></i>
                                <div class="info">
                                    <h4>MG_4145.jpg')}}</h4>
                                    <small>5.6MB</small>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)">
                                <i class="zmdi zmdi-image l-parpl"></i>
                                <div class="info">
                                    <h4>MG_4100.jpg')}}</h4>
                                    <small>5MB</small>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)">
                                <i class="zmdi zmdi-collection-text l-amber"></i>
                                <div class="info">
                                    <h4>Reports_end.doc</h4>
                                    <small>780KB</small>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)">
                                <i class="zmdi zmdi-videocam l-turquoise"></i>
                                <div class="info">
                                    <h4>movie2018.MKV</h4>
                                    <small>750MB</small>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</aside>

<div class="chat-wrapper">
    <div class="card">
        <div class="header">
            <ul class="list-unstyled team-info margin-0">
                <li class="m-r-15"><h2>Agent Team</h2></li>
                <li><img src="{{asset('templates/oreo/light/assets/images/xs/avatar2.jpg')}}" alt="Avatar"></li>
                <li><img src="{{asset('templates/oreo/light/assets/images/xs/avatar3.jpg')}}" alt="Avatar"></li>
                <li><img src="{{asset('templates/oreo/light/assets/images/xs/avatar4.jpg')}}" alt="Avatar"></li>
                <li><img src="{{asset('templates/oreo/light/assets/images/xs/avatar6.jpg')}}" alt="Avatar"></li>
                <li><a href="javascript:void(0);" title="Add Member"><i class="zmdi zmdi-plus-circle"></i></a></li>
            </ul>
        </div>
        <div class="body">
            <div class="chat-widget">
                <ul class="chat-scroll-list clearfix">
                    <li class="left float-left">
                        <img src="{{asset('templates/oreo/light/assets/images/xs/avatar3.jpg')}}" class="rounded-circle"
                             alt="">
                        <div class="chat-info">
                            <a class="name" href="javascript:void(0);">Alexander</a>
                            <span class="datetime">6:12</span>
                            <span class="message">Hello, John </span>
                        </div>
                    </li>
                    <li class="right">
                        <div class="chat-info"><span class="datetime">6:15</span> <span
                                class="message">Hi, Alexander<br> How are you!</span></div>
                    </li>
                    <li class="right">
                        <div class="chat-info"><span class="datetime">6:16</span> <span class="message">There are many variations of passages of Lorem Ipsum available</span>
                        </div>
                    </li>
                    <li class="left float-left"><img
                            src="{{asset('templates/oreo/light/assets/images/xs/avatar2.jpg')}}" class="rounded-circle"
                            alt="">
                        <div class="chat-info"><a class="name" href="javascript:void(0);">Elizabeth</a> <span
                                class="datetime">6:25</span> <span class="message">Hi, Alexander,<br> John <br> What are you doing?</span>
                        </div>
                    </li>
                    <li class="left float-left"><img
                            src="{{asset('templates/oreo/light/assets/images/xs/avatar1.jpg')}}" class="rounded-circle"
                            alt="">
                        <div class="chat-info"><a class="name" href="javascript:void(0);">Michael</a> <span
                                class="datetime">6:28</span> <span class="message">I would love to join the team.</span>
                        </div>
                    </li>
                    <li class="right">
                        <div class="chat-info"><span class="datetime">7:02</span> <span class="message">Hello, <br>Michael</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="input-group p-t-15">
                <input type="text" class="form-control" placeholder="Enter text here...">
                <span class="input-group-addon">
                    <i class="zmdi zmdi-mail-send"></i>
                </span>
            </div>
        </div>
    </div>
</div>

<!-- Main Content -->
@yield('content')

<!-- Jquery Core Js -->
<script src="{{asset('templates/oreo/light/assets/bundles/libscripts.bundle.js')}}"></script>
<script src="{{asset('templates/oreo/light/assets/bundles/vendorscripts.bundle.js')}}"></script>

<script src="{{asset('templates/oreo/light/assets/bundles/c3.bundle.js')}}"></script>
<script src="{{asset('templates/oreo/light/assets/bundles/jvectormap.bundle.js')}}"></script>
<script src="{{asset('templates/oreo/light/assets/bundles/knob.bundle.js')}}"></script>

<script src="{{asset('templates/oreo/light/assets/bundles/mainscripts.bundle.js')}}"></script>
<script src="{{asset('templates/oreo/light/assets/js/pages/index.js')}}"></script>
@yield('scripts')
<!--Vue-->
<script src="{{ asset('/js/vue/vue.js') }}"></script>{{----}}

<!--httpVueLoader-->
<script src="{{ asset('/js/vue/httpVueLoader.min.js') }}"></script>
<!--Vue Chat Scroll -->
<script src="{{ asset('/js/vue/vue-chat-scroll.min.js') }}"></script>
<!--Axios-->
<script src="{{ asset('/js/vue/axios.min.js') }}"></script>

<!--Vue Router-->
{{--<script src="{{ asset('/js/vue/vue-router.js') }}"></script>--}}

<!--Vuedraggable-->
<script src="{{ asset('/js/vue/vuedraggable.min.js') }}"></script>

<!--Main Script-->
<script src="{{ asset('/js/vue/main.js') }}"></script>

</body>
</html>
