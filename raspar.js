import * as cheerio from "cheerio";

import axios from "axios";

async function raspar(url) {
  const { data: html } = await axios.get(url);

  const $ = cheerio.load(html);

  // equivalente ao querySelectorAll
  const links = [];

  $(".reg a").each((_, element) => {
    const href = $(element).attr("href");

    if (href) {
      links.push(href);
    }
  });

  processar(links);
  console.log('\n-----------\n');
}

function processar(vetor) {
	const novo = [];
	let temp = [];
	let chave = "";
	for (let i=0; i<vetor.length; i++) {
       let item = vetor[i];
	   if (item.includes("genesis")) {
		   if (temp.length > 0) {
			   novo[chave] = temp;
               temp = [];			   
		   }
		   let v = item.substr(1).split('/');
		   let verso = v[1].replace('.htm','').replace('-','_');
		   chave = "GEN_" + verso;
		   continue;
	   }
	   if (item.includes("hebrew")) {
		    temp.push(item.replace('/hebrew/','').replace('.htm',''));
	   }
    }
	novo[chave] = temp;
	console.log(novo);
	
}

raspar("https://bibliaportugues.com/kjvs/genesis/1.htm");

//raspar("https://bibliaportugues.com/kjvs/genesis/2.htm");

//raspar("https://bibliaportugues.com/kjvs/exodus/1.htm");

//raspar("https://bibliaportugues.com/kjvs/psalms/1.htm");

//raspar("https://bibliaportugues.com/kjvs/daniel/2.htm");

//raspar("https://bibliaportugues.com/kjvs/malachi/3.htm");
