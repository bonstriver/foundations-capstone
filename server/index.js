const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(express.json());
app.use(cors());

// --------------------------------------------------------------------

// Team Randomizer
let teams = [
    {
        id: 'atlanta',
        name: "Atlanta Hawks",
        imgUrl: "https://www.nba.com/hawks/sites/hawks/files/hawks-logo-165.png?",
        site: "https://www.nba.com/hawks/"
    },{
        id: 'boston',
        name: "Boston Celtics",
        imgUrl: "https://cdn11.bigcommerce.com/s-0f122/images/stencil/160w/products/399/18373/1__79929.1463743356.jpg?c=2",
        site: "https://www.nba.com/celtics/"
    },{
        id: 'brooklyn',
        name: "Brooklyn Nets",
        imgUrl: "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/092012/brooklyn_nets_secondary_logo.png?itok=qUT3WRUD",
        site: "https://www.nba.com/nets/"
    },{
        id: 'charlotte',
        name: "Charlotte Hornets",
        imgUrl: "https://www.nba.com/hornets/sites/hornets/files/hornets_primary_logo.png?",
        site: "https://www.nba.com/hornets/"
    },{
        id: 'chicago',
        name: "Chicago Bulls",
        imgUrl: "https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/102012/chicagobulls.png?itok=yUtQfBH7",
        site: "https://www.nba.com/bulls/"
    },{
        id: 'cleveland',
        name: "Cleveland Cavaliers",
        imgUrl: "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/112015/nba_cleveland_cavaliers.png?itok=Hns--hZ9",
        site: "https://www.nba.com/cavaliers/"
    },{
        id: 'dallas',
        name: "Dallas Mavericks",
        imgUrl: "https://logovector.net/wp-content/uploads/2012/11/290886-dallas-mavericks-logo.png",
        site: "https://www.mavs.com/"
    },{
        id: 'denver',
        name: "Denver Nuggets",
        imgUrl: "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/062018/untitled-2_37.png?v4jXmpGZyy88BBO5FeI5XoVg_x0e2YcU&itok=xt6m9rk3",
        site: "https://www.nba.com/nuggets/"
    },{
        id: 'detroit',
        name: "Detroit Pistons",
        imgUrl: "https://sportsfancovers.com/wp-content/uploads/2020/06/Pistons_logo17-1-150x150.png",
        site: "https://www.nba.com/pistons/"
    },{
        id: 'goldenState',
        name: "Golden State Warriors",
        imgUrl: "http://cdn.bleacherreport.net/images/team_logos/150x150/golden_state_warriors.png",
        site: "https://www.nba.com/warriors/"
    },{
        id: 'houston',
        name: "Houston Rockets",
        imgUrl: "https://i.pinimg.com/originals/0b/f6/b3/0bf6b3f99ec6d2e2573a068bc1314d74.png",
        site: "https://www.nba.com/rockets/"
    },{
        id: 'indiana',
        name: "Indiana Pacers",
        imgUrl: "https://es.logodownload.org/wp-content/uploads/2021/06/indiana-pacers-logo-51-150x150.png",
        site: "https://www.nba.com/pacers/"
    },{
        id: 'clippers',
        name: "Los Angeles Clippers",
        imgUrl: "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/052013/l.a._clippers.jpg?itok=3dLkAAvA",
        site: "https://www.nba.com/clippers/"
    },{
        id: 'lakers',
        name: "Los Angeles Lakers",
        imgUrl: "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/082012/lakers.png?itok=0pZN9T_M",
        site: "https://www.nba.com/lakers/"
    },{
        id: 'memphis',
        name: "Memphis Grizzlies",
        imgUrl: "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/052013/memphis_grizzlies.png?itok=vA9j5wLp",
        site: "https://www.nba.com/grizzlies/"
    },{
        id: 'miami',
        name: "Miami Heat",
        imgUrl: "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/0024/2639/brand.gif?itok=hlpbqZkL",
        site: "https://www.nba.com/heat/"
    },{
        id: 'milwaukee',
        name: "Milwaukee Bucks",
        imgUrl: "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/112017/untitled-1_14.png?90MU_V5IlKEt0KaVTxom4N4uTNjArria&itok=a6T32VsK",
        site: "https://www.nba.com/bucks/"
    },{
        id: 'minnesota',
        name: "Minnesota Timberwolves",
        imgUrl: "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/032018/untitled-3_6.png?CKqjmFYtIIZGGkpHXObCvSdahDqaMwNW&itok=-7fQp-ze",
        site: "https://www.nba.com/timberwolves/"
    },{
        id: 'pelicans',
        name: "New Orleans Pelicans",
        imgUrl: "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/012013/n.o._pelicans.png?itok=JVO-xG_E",
        site: "https://www.nba.com/pelicans/"
    },{
        id: 'knicks',
        name: "New York Knicks",
        imgUrl: "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/022013/new_york_knicks_2013.png?itok=9hOmw7YE",
        site: "https://www.nba.com/knicks/"
    },{
        id: 'thunder',
        name: "Oklahoma City Thunder",
        imgUrl: "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/012011/picture_1.png?WnhBJaG797Cnz7b_xYJDnaYs9CqwumsY&itok=Npqh0ngD",
        site: "https://www.nba.com/thunder/"
    },{
        id: 'orlando',
        name: "Orlando Magic",
        imgUrl: "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/112010/untitled-1_1.png?itok=agaVwAkh",
        site: "https://www.nba.com/magic/"
    },{
        id: 'philadelphia',
        name: "Philadelphia 76ers",
        imgUrl: "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/042011/76ers-converted.png?itok=--11wZvn",
        site: "https://www.nba.com/sixers/"
    },{
        id: 'phoenix',
        name: "Phoenix Suns",
        imgUrl: "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/042011/phoenix_suns.jpeg?itok=Wm_MmUhj",
        site: "https://www.nba.com/suns/"
    },{
        id: 'portland',
        name: "Portland Trail Blazers",
        imgUrl: "http://howmanyarethere.net/wp-content/uploads/2011/05/Portland-Trail-Blazers-Logo-150x150.png",
        site: "https://www.nba.com/blazers/"
    },{
        id: 'sacramento',
        name: "Sacramento Kings",
        imgUrl: "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/012018/untitled-1_19.png?hmwelvSv2zXwU3BmW0EjjpjLkxhh3ZNw&itok=_UB2c5x8",
        site: "https://www.nba.com/kings/"
    },{
        id: 'spurs',
        name: "San Antonio Spurs",
        imgUrl: "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/092014/san_antonio_spurs_logo.png?itok=JqrKm07E",
        site: "https://www.nba.com/spurs/"
    },{
        id: 'toronto',
        name: "Toronto Raptors",
        imgUrl: "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/062016/untitled-1_29.png?itok=gsEpK_iX",
        site: "https://www.nba.com/raptors/"
    },{
        id: 'utah',
        name: "Utah Jazz",
        imgUrl: "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/122010/utahjazzthumb.jpeg?itok=-VgJVhAz",
        site: "https://www.nba.com/jazz/"
    },{
        id: 'washington',
        name: "Washington Wizards",
        imgUrl: "https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/042012/washington_wizards_logo_2011.png?itok=xqOJsxkD",
        site: "https://www.nba.com/wizards/"
    }
]

const values = Object.values(teams)

app.get("/api/teams", (req, res)=>{
    const randomTeam = values[Math.floor(Math.random()*values.length)]
    console.log(randomTeam)
    res.status(200).send(randomTeam)
})

// -----------------------------------------------------------------------



// -----------------------------------------------------------------------

// Team Creator
const {getTeams, deleteTeam, createTeam, updateTeam} = require('./controller')

app.get(`/api/teams`, getTeams)
app.delete(`/api/teams/:id`, deleteTeam)
app.post(`/api/teams`, createTeam)
app.put(`/api/teams/:id`, updateTeam)

// -------------------------------------------------------------------------

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '../landing.html'))
})

const port = process.env.PORT || 5151

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
})



// TEST
