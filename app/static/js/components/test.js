/**
 * Created by hsgao on 17-3-30.
 */

function formatName(user) {
    return user.firstname + ' ' + user.lastname;
 }

const hsgao = {
    firstname: "gao",
    lastname: "huansheng"
} ;

const element = (
    <h2>{formatName(hsgao)}</h2>
)

ReactDOM.render(
    element,
    document.getElementById("example")
)