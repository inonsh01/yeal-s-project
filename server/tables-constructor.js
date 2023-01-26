var mysql = require('mysql');
let fs = require('fs');
let dir = fs.readdirSync('./tables-data')

// create the database "projectDB"
// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "inonsh01"
//   });
//   con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     con.query("CREATE DATABASE projectDB", function (err, result) {
//       if (err) throw err;
//       console.log("Database created");
//     });
//   });

// // drop tables
// // DROP TABLE IF EXISTS school;
// // con.connect(function(err) {
// //   if (err) throw err;
// //   var sql = "DROP TABLE school";
// //   con.query(sql, function (err, result) {
// //     if (err) throw err;
// //     console.log("Table deleted");
// //   });
// // });

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "inonsh01",
    database: "projectDB"
});

// //function that create all tables:
// let makeTables = (dir) => {
//     con.connect(function (err) {
//     for (let j = 0; j < dir.length; j++) {
//         let currentJson = require(`./tables-data/${dir[j]}`);
//             if (err) throw err; 
//             currentJson.table_name;
//             console.log("Connected!");
//             let fullTable = []
//             for (let i = 0; i < currentJson.columns.length; i++) {
//                 fullTable.push(
//                     " " + (currentJson.columns[i].col_name) + " " +
//                     (currentJson.columns[i].type) +
//                     (currentJson.columns[i].AUTO_INCREMENT ? " AUTO_INCREMENT" : "") +
//                     (currentJson.columns[i].PRIMARY_KEY ? " PRIMARY KEY" : "") +
//                     (currentJson.columns[i].UNIQUE ? " UNIQUE" : "") +
//                     (currentJson.columns[i].NOT_NULL ? " NOT NULL" : "") +
//                     (currentJson.columns[i].FOREIGN_KEY ? ", FOREIGN KEY " + "(" + currentJson.columns[i].col_name + ")" + " REFERENCES " + currentJson.columns[i].FOREIGN_KEY + "(" + currentJson.columns[i].col_name + ")" : ""))
//                 }
//             var sql = `CREATE TABLE ${currentJson.table_name} (
//                 ${fullTable.join()}
//             )`;
//             con.query(sql, function (err, result) {
//                 if (err) throw err;
//                 console.log(`Table ${currentJson.table_name} created`);
//             });
//         }
//     });
// }
// makeTables(dir);


// //insert into tables
let users = [["Leanne", "Graham", "Sincere@april.biz", "1-770-736-8031 x56442"], ["Ervin", "Howell", "Shanna@melissa.tv", "010-692-6593 x09125"], ["Clementine", "Bauch", "Nathan@yesenia.net", "1-463-123-4447"]];
let todos = [["delectus aut autem", false, 1], ["quis ut nam facilis et officia qui", false, 1], ["fugiat veniam minus", false, 1], ["et porro tempora", true, 1], ["laboriosam mollitia et enim quasi adipisci quia provident illum", false, 1], ["suscipit repellat esse quibusdam voluptatem incidunt", false, 2], ["distinctio vitae autem nihil ut molestias quo", true, 2], ["et itaque necessitatibus maxime molestiae qui quas velit", false, 2], ["adipisci non ad dicta qui amet quaerat doloribus ea", false, 2], ["voluptas quo tenetur perspiciatis explicabo natus", true, 2], ["aliquid amet impedit consequatur aspernatur placeat eaque fugiat suscipit", false, 3], ["rerum perferendis error quia ut eveniet", false, 3], ["tempore ut sint quis recusandae", true, 3], ["cum debitis quis accusamus doloremque ipsa natus sapiente omnis", true, 3], ["velit soluta adipisci molestias reiciendis harum", false, 3]];
let posts = [["sunt aut facere repellat provident occaecati excepturi optio reprehenderit", "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto", 1], ["qui est esse", "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla", 1], ["ea molestias quasi exercitationem repellat qui ipsa sit aut", "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut", 1], ["et ea vero quia laudantium autem", "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi", 2], ["in quibusdam tempore odit est dolorem", "itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio", 2], ["dolorum ut in voluptas mollitia et saepe quo animi", "aut dicta possimus sint mollitia voluptas commodi quo doloremque\niste corrupti reiciendis voluptatem eius rerum\nsit cumque quod eligendi laborum minima\nperferendis recusandae assumenda consectetur porro architecto ipsum ipsam", 2], [ "asperiores ea ipsam voluptatibus modi minima quia sint", "repellat aliquid praesentium dolorem quo\nsed totam minus non itaque\nnihil labore molestiae sunt dolor eveniet hic recusandae veniam\ntempora et tenetur expedita sunt", 3], ["dolor sint quo a velit explicabo quia nam", "eos qui et ipsum ipsam suscipit aut\nsed omnis non odio\nexpedita earum mollitia molestiae aut atque rem suscipit\nnam impedit esse", 3], ["maxime id vitae nihil numquam", "veritatis unde neque eligendi\nquae quod architecto quo neque vitae\nest illo sit tempora doloremque fugit quod\net et vel beatae sequi ullam sed tenetur perspiciatis", 3]];
let passwords = [["Bret", "3159", 1], ["Antonette", "9509", 2], ["Samantha", "6102", 3]];
let comments = [[1, "id labore ex et quam laborum", "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium", 2], [1, "quo vero reiciendis velit similique earum", "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et", 3], [2, "et fugit eligendi deleniti quidem qui sint nihil autem", "doloribus at sed quis culpa deserunt consectetur qui praesentium\naccusamus fugiat dicta\nvoluptatem rerum ut voluptate autem\nvoluptatem repellendus aspernatur dolorem in", 2], [2, "odio adipisci rerum aut animi", "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione", 2], [3, "alias odio sit", "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati", 2], [3, "vero eaque aliquid doloribus et culpa", "harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et", 3], [4, "repellat consequatur praesentium vel minus molestias voluptatum", "maiores sed dolores similique labore et inventore et\nquasi temporibus esse sunt id et\neos voluptatem aliquam\naliquid ratione corporis molestiae mollitia quia et magnam dolor", 1], [4, "et omnis dolorem", "ut voluptatem corrupti velit\nad voluptatem maiores\net nisi velit vero accusamus maiores\nvoluptates quia aliquid ullam eaque", 3], [5, "provident id voluptas", "sapiente assumenda molestiae atque\nadipisci laborum distinctio aperiam et ab ut omnis\net occaecati aspernatur odit sit rem expedita\nquas enim ipsam minus", 1], [5, "eaque et deleniti atque tenetur ut quo ut", "voluptate iusto quis nobis reprehenderit ipsum amet nulla\nquia quas dolores velit et non\naut quia necessitatibus\nnostrum quaerat nulla et accusamus nisi facilis", 3], [6, "fugit labore quia mollitia quas deserunt nostrum sunt", "ut dolorum nostrum id quia aut est\nfuga est inventore vel eligendi explicabo quis consectetur\naut occaecati repellat id natus quo est\nut blanditiis quia ut vel ut maiores ea", 1], [6, "modi ut eos dolores illum nam dolor", "expedita maiores dignissimos facilis\nipsum est rem est fugit velit sequi\neum odio dolores dolor totam\noccaecati ratione eius rem velit", 3], [7, "aut inventore non pariatur sit vitae voluptatem sapiente", "fuga eos qui dolor rerum\ninventore corporis exercitationem\ncorporis cupiditate et deserunt recusandae est sed quis culpa\neum maiores corporis et", 1], [7, "et officiis id praesentium hic aut ipsa dolorem repudiandae", "vel quae voluptas qui exercitationem\nvoluptatibus unde sed\nminima et qui ipsam aspernatur\nexpedita magnam laudantium et et quaerat ut qui dolorum", 2], [8, "debitis magnam hic odit aut ullam nostrum tenetur", "nihil ut voluptates blanditiis autem odio dicta rerum\nquisquam saepe et est\nsunt quasi nemo laudantium deserunt\nmolestias tempora quo quia", 2], [8, "perferendis temporibus delectus optio ea eum ratione dolorum",  "iste ut laborum aliquid velit facere itaque\nquo ut soluta dicta voluptate\nerror tempore aut et\nsequi reiciendis dignissimos expedita consequuntur libero sed fugiat facilis", 2], [9, "eos est animi quis", "consequatur necessitatibus totam sed sit dolorum\nrecusandae quae odio excepturi voluptatum harum voluptas\nquisquam sit ad eveniet delectus\ndoloribus odio qui non labore", 1], [9, "aut et tenetur ducimus illum aut nulla ab", "veritatis voluptates necessitatibus maiores corrupti\nneque et exercitationem amet sit et\nullam velit sit magnam laborum\nmagni ut molestias", 2]];

fetch('http://localhost:4000/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({data: users})
})

fetch('http://localhost:4000/todo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({data: todos})
})

fetch('http://localhost:4000/post', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({data: posts})
})

fetch('http://localhost:4000/password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({data: passwords})
})

fetch('http://localhost:4000/comment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({data: comments})
})