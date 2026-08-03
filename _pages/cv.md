---
layout: archive
title: ""
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---


<iframe
    src="/pdfjs/web/viewer.html?file=/files/DFerro-CV.pdf#zoom=page-width"
    style="width:100%;height:90vh;border:none;">
</iframe>


<!-- =========================================================
     PDF.js CV VIEWER
     ========================================================= -->

<script type="module">

  import * as pdfjsLib
    from "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs";

  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs";


  let cvPDF = null;
  let cvScale = 1.0;
  let cvFitScale = 1.0;
  let cvRendering = false;


  /* =========================================================
     LOAD CV
     ========================================================= */

  async function loadCV() {

    const container =
      document.getElementById("cvPDFContainer");

    try {

      cvPDF =
        await pdfjsLib
          .getDocument("/files/DFerro-CV.pdf")
          .promise;


      /*
       * Calculate initial fit-to-width scale
       */

      const firstPage =
        await cvPDF.getPage(1);

      const baseViewport =
        firstPage.getViewport({
          scale: 1
        });


      const availableWidth =
        container.clientWidth - 40;


      cvFitScale =
        availableWidth /
        baseViewport.width;


      cvScale =
        cvFitScale;


      updateCVZoom();

      await renderCV();

    }

    catch (error) {

      console.error(
        "PDF.js error:",
        error
      );


      container.innerHTML =
        '<div style="' +
        'padding:30px;' +
        'text-align:center;' +
        'color:#777;' +
        '">' +
        'Unable to load CV.' +
        '</div>';

    }

  }


  /* =========================================================
     RENDER ALL CV PAGES
     ========================================================= */

  async function renderCV() {

    if (!cvPDF || cvRendering)
      return;


    cvRendering = true;


    const container =
      document.getElementById(
        "cvPDFContainer"
      );


    container.innerHTML = "";


    try {

      for (
        let pageNumber = 1;
        pageNumber <= cvPDF.numPages;
        pageNumber++
      ) {

        const page =
          await cvPDF.getPage(
            pageNumber
          );


        const viewport =
          page.getViewport({
            scale: cvScale
          });


        /*
         * Page wrapper
         */

        const pageWrapper =
          document.createElement("div");


        pageWrapper.style.cssText =
          "width:max-content;" +
          "margin:0 auto 20px auto;" +
          "background:white;" + 
          "box-shadow:0 1px 5px rgba(0,0,0,.18);"; 


        /*
         * Canvas
         */

        const canvas =
          document.createElement(
            "canvas"
          );


        canvas.width =
          viewport.width;


        canvas.height =
          viewport.height;


        canvas.style.display =
          "block";


        pageWrapper.appendChild(
          canvas
        );


        container.appendChild(
          pageWrapper
        );


        /*
         * Render
         */

        const context =
          canvas.getContext("2d");


        await page.render({

          canvasContext:
            context,

          viewport:
            viewport

        }).promise;

      }

    }

    finally {

      cvRendering = false;

    }

  }


  /* =========================================================
     UPDATE ZOOM LABEL
     ========================================================= */
  /*
  function updateCVZoom() {

    document.getElementById(
      "cvPDFZoom"
    ).textContent =
      Math.round(
        cvScale * 100
      ) + "%";

  }
  */

  function updateCVZoom() {

  const percentage =
    Math.round(
      (cvScale / cvFitScale) * 100
    );

  document.getElementById(
    "cvPDFZoom"
  ).textContent =
    percentage + "%";

}

  /* =========================================================
     ZOOM IN
     ========================================================= */

  window.zoomCVIn = async function() {

    if (!cvPDF)
      return;


    cvScale += 0.20;

    updateCVZoom();

    await renderCV();

  };


  /* =========================================================
     ZOOM OUT
     ========================================================= */

  window.zoomCVOut = async function() {

    if (!cvPDF)
      return;


    cvScale =
      Math.max(
        0.5,
        cvScale - 0.20
      );


    updateCVZoom();

    await renderCV();

  };


  /* =========================================================
     FIT TO WIDTH
     ========================================================= */

  window.fitCVWidth = async function() {

    if (!cvPDF)
      return;


    const container =
      document.getElementById(
        "cvPDFContainer"
      );


    const firstPage =
      await cvPDF.getPage(1);


    const baseViewport =
      firstPage.getViewport({
        scale: 1
      });


    const availableWidth =
      container.clientWidth - 40;


    cvFitScale =
      availableWidth /
      baseViewport.width;


    cvScale =
      cvFitScale;


    updateCVZoom();

    await renderCV();

  };


  /* =========================================================
     LOAD WHEN PAGE IS READY
     ========================================================= */

  loadCV();

</script>



<!-- =========================================================
     CV TOOLBAR
     ========================================================= -->

<div style="
    width:100%;
    height:44px;
    border-bottom:none;
    box-sizing:border-box;
    display:flex;
    align-items:center;
    justify-content:center;
    gap:6px;
    text-align:center;
    margin-top:-40px;
    ">


  <!-- Zoom out -->
  
  <button
    onclick="zoomCVOut()"
    style="
      cursor:pointer;
      padding:3px 10px;
      font-size:16px;
      ">

    −

  </button>


  <!-- Fit to width / zoom level -->
  
  <button
    onclick="fitCVWidth()"
    id="cvPDFZoom"
    style="
      cursor:pointer;
      border:none;
      background:transparent;
      min-width:60px;
      padding:3px;
      font-size:12px;
      ">

    Fit

  </button>


  <!-- Zoom in -->
  <button
    onclick="zoomCVIn()"
    style="
      cursor:pointer;
      padding:3px 10px;
      font-size:16px;
      ">

    +

  </button>

</div>



<!-- =========================================================
     CV PDF
     ========================================================= -->

<div
  id="cvPDFContainer"
  style="
    width:100%;
    height:auto;
    overflow-x:scroll;
    overflow-y:auto;
    padding:20px;
    box-sizing:border-box;
    text-align:center;
    ">

</div>



<!--<iframe style="width:100%; height:90vh" src="/files/CV-FERRO.pdf"></iframe>-->

<!--<iframe style="width:100%; height:90vh" src="/files/DFerro-CV.pdf"></iframe>-->


<!--

#{% include base_path %}
#
#Education
#======
#* Ph.D in Version Control Theory, GitHub University, 2018 (expected)
#* M.S. in Jekyll, GitHub University, 2014
#* B.S. in GitHub, GitHub University, 2012
#
#Work experience
#======
#* Spring 2024: Academic Pages Collaborator
#  * Github University
#  * Duties includes: Updates and improvements to template
#  * Supervisor: The Users
#
#* Fall 2015: Research Assistant
#  * Github University
#  * Duties included: Merging pull requests
#  * Supervisor: Professor Hub
#
#* Summer 2015: Research Assistant
#  * Github University
#  * Duties included: Tagging issues
#  * Supervisor: Professor Git
#  
#Skills
#======
#* Skill 1
#* Skill 2
#  * Sub-skill 2.1
#  * Sub-skill 2.2
#  * Sub-skill 2.3
#* Skill 3
#
#Publications
#======
#  <ul>{% for post in site.publications reversed %}
#    {% include archive-single-cv.html %}
#  {% endfor %}</ul>
#  
#Talks
#======
#  <ul>{% for post in site.talks reversed %}
#    {% include archive-single-talk-cv.html  %}
#  {% endfor %}</ul>
#  
#Teaching
#======
#  <ul>{% for post in site.teaching reversed %}
#    {% include archive-single-cv.html %}
#  {% endfor %}</ul>
#  
#Service and leadership
#======
#* Currently signed in to 43 different slack teams


-->
