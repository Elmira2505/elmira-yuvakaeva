const myName = "Elmira Yuvakaeva" 
const today = new Date()
const thisYear = today.getFullYear()


const container = document.querySelector(".container")
const footer = document.createElement("footer")
footer.id = "footer"
container.appendChild(footer)
const footerNode = document.querySelector("#footer")
const copyright = document.createElement("p")
copyright.innerText = `© ${myName}  ${thisYear}`
footerNode.appendChild(copyright)

const skills = [  "JavaScript", "React JS", "Node JS", "MongoDB", "HTML", "CSS", "GitHub"]
const skillSection = document.getElementById("skills")
const skillList = skillSection.querySelector("ul")
for (let i = 0; i < skills.length; i++){
    const skillElem = document.createElement("li");
    skillElem.innerText = skills[i]
    skillElem.className = "wraper"
    skillList.appendChild(skillElem)
}

const messageSection = document.getElementById("messages")
messageSection.style.display = "none"
const messageList = messageSection.querySelector("ul")
const newMessage = document.createElement("li")



function createButton(nameBtn, classBtn){
  const button = document.createElement("button");
  button.type = "button";
  button.innerText = nameBtn;
  button.className = classBtn
  return button
}






const form =  document.querySelector('form[name="leave_message"]')
form.addEventListener('submit',(event)=>{
    event.preventDefault()
    const name= event.target.name.value
    const email= event.target.email.value
    const message = event.target.usersMessage.value
    messageSection.style.display = "block"
    messageElement(name, email, message)
  

})
function toggleSectionMes() {
  if (messageList.children.length === 0) {
    messageSection.style.display = "none";
  } else {
    messageSection.style.display = "block";
  }
}



function messageElement(name, email, message){
 
  const newMessage = document.createElement("li")
newMessage.innerHTML= ` 
<a href ="mailto: ${email}">${name}</a> <br>
<span> ${message.trim()}</span>`
const removeBtn = createButton("remove", "submit messageBtn" );
const editBtn = createButton("edit", "submit messageBtn" );

const btnContainer = document.createElement("div");
btnContainer.className = "messagesBtnGroup";

btnContainer.appendChild(editBtn);
btnContainer.appendChild(removeBtn);

newMessage.appendChild(btnContainer);
messageList.appendChild(newMessage)

removeBtn.addEventListener("click", (event) => {
  const messageEl = event.target.parentNode.parentNode;
  console.log(messageEl)
  messageEl.remove();
 toggleSectionMes() 

});

  editBtn.addEventListener("click", () => {

    const span = newMessage.querySelector("span");

    const updatedText = prompt(
      "Edit message",
      span.innerText
    );

    if (updatedText) {
      span.innerText = updatedText;
    }

  });


} 