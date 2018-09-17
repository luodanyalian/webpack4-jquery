import 'jquery'
import '../../js/utils/lazyload.js'
import "@/css/common.scss";
import '../common.js';
import '@/css/brand/cooperation.scss';

$(function () {

	var line1 = document.getElementById("line1");
	var line2 = document.getElementById("line2");
	var line3 = document.getElementById("line3");

	var p1 = document.getElementById("p1");
	var p2 = document.getElementById("p2");
	var p3 = document.getElementById("p3");

	var content1 = document.getElementById("way-content1");
	var content2 = document.getElementById("way-content2");
	var content3 = document.getElementById("way-content3");


	p1.addEventListener("click",function(){
		line2.style.display = "none";
		line3.style.display = "none";

        content2.style.display = "none";
		content3.style.display = "none";
		
		content1.style.display = "inline";
		line1.style.display = "block"

		p2.style.opacity="0.5";
		p3.style.opacity="0.5";
		p1.style.opacity="1.0";

    },false);

	p2.addEventListener("click",function(){
		line1.style.display = "none";
		line3.style.display = "none";
 
        content1.style.display = "none";
		content3.style.display = "none";
		
		line2.style.display = "block"
		content2.style.display = "inline";

		p2.style.opacity="1.0";
		p3.style.opacity="0.5";
		p1.style.opacity="0.5";

    },false);

	p3.addEventListener("click",function(){
		line1.style.display = "none";
		line2.style.display = "none";

        content1.style.display = "none";
		content2.style.display = "none";
		
		line3.style.display = "block"
		content3.style.display = "inline";


		p1.style.opacity="0.5";
		p2.style.opacity="0.5";
		p3.style.opacity="1.0";
    },false);
})