<!DOCTYPE html>
<html class="no-js" lang="en">
    <head>
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <title>Red Hot Chili Burger</title>

        <link rel="apple-touch-icon" sizes="180x180" href="assets/icons/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="assets/icons/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="assets/icons/favicon-16x16.png">
        <link rel="manifest" href="site.webmanifest">
        <link rel="mask-icon" href="safari-pinned-tab.svg" color="#c5921a">
        <link rel="shortcut icon" href="assets/icons/favicon.ico">
        <meta name="msapplication-TileColor" content="#231f20">
        <meta name="msapplication-config" content="browserconfig.xml">
        <meta name="theme-color" content="#231f20">

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway:400,800">
        <link rel='stylesheet' href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="css/bootstrap.css">
        <link rel="stylesheet" href="css/style.css">
    </head>

    <body>
        <div class="navbar-wrapper scrollblock">
            <div class="row container-fluid px-0 px-lg-5">
                <div id="logo-container" class="col-12">
                    <img class="logo-image" src="assets/img/logo.png" alt="logo" draggable="false"/>
                </div>
            </div>
        </div>

        <div id="form-content" class="d-flex justify-content-center">
            <div class="form-order">
                <div class="row table-responsive">
                    <table class="col-12 table table-hover">
                        <tbody>
                            <tr>
                                <td>Patties</td>
                                <td class="table-number"><?= array_key_exists(patties, $_POST) ? $_POST[patties] : '-' ?></td>
                            </tr>
                            <tr>
                                <td>Cheese</td>
                                <td class="table-number"><?= array_key_exists(cheese, $_POST) ? $_POST[cheese] : '-' ?></td>
                            </tr>
                            <tr>
                                <td>Lettuce</td>
                                <td class="table-number"><?= array_key_exists(lettuce, $_POST) ? $_POST[lettuce] : '-' ?></td>
                            </tr>
                            <tr>
                                <td>Onion</td>
                                <td class="table-number"><?= array_key_exists(onion, $_POST) ? $_POST[onion] : '-' ?></td>
                            </tr>
                            <tr>
                                <td>Tomato</td> 
                                <td class="table-number"><?= array_key_exists(tomato, $_POST) ? $_POST[tomato] : '-' ?></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td style="text-align: right;">Total:</td>
                                <td class="table-number"><?= $_POST[price] ?></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div class="row">
                    <span><?php
                        switch ($_POST[sauce]) {
                            case classic:
                                echo "Classic";
                                break;
                            case garlic:
                                echo "Garlic";
                                break;
                            case ranch:
                                echo "Ranch";
                                break;
                        }   
                    ?></span>
                </div>  
                <div class="row">
                    <div class="col-12 text-center">
                        <a href="index.html"><button id="return-button" class="btn btn-primary btn-lg">Confirm order</button></a>
                    </div>
                </div>
            </div>
        </div>

        <footer class="footer container-fluid">
            <div class="row">
                <div class="social-networks d-flex justify-content-around offset-sm-1 col-sm-10 offset-lg-1 col-lg-4 offset-xl-2 col-xl-3 my-3">
                    <a href="#"><img class="social-button" src="assets/img/socials/social-facebook.png" draggable="false"/></a>
                    <a href="#"><img class="social-button" src="assets/img/socials/social-instagram.png" draggable="false"/></a>
                    <a href="#"><img class="social-button" src="assets/img/socials/social-pinterest.png" draggable="false"/></a>
                    <a href="#"><img class="social-button" src="assets/img/socials/social-linkedin.png" draggable="false"/></a>
                    <a href="#"><img class="social-button" src="assets/img/socials/social-twitter.png" draggable="false"/></a>
                </div>
            </div>
            <div class="row">
                <div class="footer-copyright text-center col-sm-12 offset-lg-5 col-lg-2"><span>© 2016 — 2020</span></div>
            </div> 
        </footer>

        <script src="js/jquery.min.js"></script>
        <script src="js/tether.min.js"></script>
        <script src="js/jquery.scrollorama.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/form.js"></script>
    </body>
</html>