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