        var tablinks = document.getElementsByClassName("tab-links");
        var tabcontents = document.getElementsByClassName("tab-contents");
        function opentab(tabname){
            for(tablink of tablinks){
                tablink.classList.remove("active-link");
            }
            for(tabcontent of tabcontents){
                tabcontent.classList.remove("active-tab");
            }
            event.currentTarget.classList.add("active-link");
            document.getElementById(tabname).classList.add("active-tab");
        }
        var sidemenu = document.getElementById("sidemenu");
        function closemenu(){
            sidemenu.style.right = "-200px";
        }
        function openmenu(){
            sidemenu.style.right = "0";
        }
        const scriptURL = 'https://script.google.com/macros/s/AKfycbyDqq8zfIT9-U05XvZ0XekYJLwoVjw1AS-A5VXF-FS6774jMgpmlRzBc7MMDUEOcrHt/exec'
        const form = document.forms['submit-to-google-sheet']
        const msg = document.getElementById("msg");
      
        form.addEventListener('submit', e => {
          e.preventDefault()
          fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => {
                msg.innerHTML = "Form Submitted Successfully!"
                setTimeout(function(){
                    msg.innerHTML = ""
                }, 5000)
                form.reset();
            })
            .catch(error => console.error('Error!', error.message))
        })