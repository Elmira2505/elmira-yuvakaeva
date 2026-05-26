const myName = "Elmira Yuvakaeva" 
const today = new Date()
const thisYear = today.getFullYear()


const container =document.getElementsByClassName("container")[0]
container.innerHTML += "<footer id='footer'></footer>"
const footer = document.querySelector("#footer")
const copyright = document.createElement("p")
copyright.innerText = `© ${myName}  ${thisYear}`
footer.appendChild(copyright)

const skills = [  "JavaScript", "React JS", "Node JS", "MondgoDB", "HTML", "CSS", "GitHub"]
const skillSection = document.getElementById("skills")
const skillList = skillSection.querySelector("ul")
for (let i = 0; i < skills.length; i++){
    const skillElem = document.createElement("li");
    skillElem.innerText = skills[i]
    skillElem.className = "wraper"
    console.log(skillElem)
    skillList.appendChild(skillElem)
}