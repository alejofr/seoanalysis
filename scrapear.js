const express = require('express');
const cors = require('cors');
const MetaInspector = require('metainspector');


const app = express();

app.use(cors());
app.use(express.json());

app.post('/audit-pages-head', async (req, res) => {
    let results = [];
    const arbol = req.body.arbol;

    for (let i = 0; i < arbol.length; i++) {
        const data = await metadata(arbol[i]).then((response) => {
            return response;
        }).catch((response) => {
            return response
        });

        results.push(data)
    }

    res.json({
        status: 200,
        results: results
    }, 200) 
})

function metadata(url) {
    return new Promise((resolve, reject) => {
        try {
          const client = new MetaInspector(url, { timeout: 0 } );
    
          client.on('fetch', () => {
            let key = client.keywords

            if( key.length != 0 ){
                let aux = '';
                for (let i = 0; i < key.length; i++) {
                    aux = ( aux == "" ) ? aux+''+key[i] : aux+','+key[i];
                }

                key = aux;
            }else{
                key = '';
            }


            const { description, title, url } = client;
            resolve({ description, title, keywords: key, url, status: 200 });
          });
    
          client.on('error', (err) => {
            console.log(err);
            reject({
              status: 404,
              description: '',
              title: '',
              url: client.url,
              keywords: ''
            });
          });
    
          client.fetch();
        } catch (error) {
          reject({
            status: 404,
            description: '',
            title: '',
            url: client.url,
            keywords: ''
          });
        }
    }); 
}


app.listen(3000, () =>{
    console.log("start server")
});

