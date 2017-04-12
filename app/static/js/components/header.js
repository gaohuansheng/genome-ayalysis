/**
 * Created by hsgao on 17-3-24.
 */

var Header = React.createClass({
   render: function () {
       return (
           <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
               <div className="container">
                   <div className="navbar-header">
                       <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                               aria-expanded="false" aria-controls="navbar">
                           <span className="sr-only">Toggle navigation</span>
                           <span className="icon-bar"></span>
                           <span className="icon-bar"></span>
                           <span className="icon-bar"></span>
                       </button>
                       <a className="navbar-brand" href="/">Genome Analysis</a>
                   </div>
                   <div id="navbar" className="navbar-collapse collapse">
                       <ul className="nav navbar-nav navbar-right">
                           <li><a href="#">Account</a></li>
                           <li><a href="#">Help</a></li>
                           {/*{% if current_user.is_authenticated %}*/}
                                {/*<li><a href="{{ url_for('auth.logout') }}">Sign out</a></li>*/}
                           {/*{% else %}*/}
                                {/*<li><a href="{{ url_for('auth.register') }}">Sign up</a></li>*/}
                                {/*<li><a href="{{ url_for('auth.login') }}">Login</a></li>*/}
                           {/*{% endif %}*/}
                       </ul>
                       <form className="navbar-form navbar-right">
                           <input type="text" className="form-control" placeholder="Search..." />
                       </form>
                   </div>
               </div>
           </nav>
       )
   }
});

ReactDOM.render(
    <Header/>,
    document.getElementById("app")
);