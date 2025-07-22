// DOM Elements
const form = document.getElementById('resume-form');
const dynamicSections = document.getElementById('dynamic-sections');
const previewFrame = document.getElementById('resume-preview');
const templateSelector = document.getElementById('template');
const profileImageInput = document.getElementById('profile-image');
let profileImageDataUrl = '';

// Section counters
let sectionCounts = {
  education: 0,
  project: 0,
  experience: 0,
  skill: 0,
  certification: 0,
  language: 0,
  award: 0,
  interest: 0,
  reference: 0
};

// Store resume data
let resumeData = {
  name: '',
  email: '',
  phone: '',
  about: '',
  education: [],
  projects: [],
  experience: [],
  skills: [],
  certifications: [],
  languages: [],
  awards: [],
  interests: [],
  references: [],
  profileImage: ''
};

// Helper to create section forms
document.getElementById('add-education').onclick = () => addSection('education');
document.getElementById('add-project').onclick = () => addSection('project');
document.getElementById('add-experience').onclick = () => addSection('experience');
document.getElementById('add-skill').onclick = () => addSection('skill');
document.getElementById('add-certification').onclick = () => addSection('certification');
document.getElementById('add-language').onclick = () => addSection('language');
document.getElementById('add-award').onclick = () => addSection('award');
document.getElementById('add-interest').onclick = () => addSection('interest');
document.getElementById('add-reference').onclick = () => addSection('reference');

function addSection(type) {
  sectionCounts[type]++;
  const idx = sectionCounts[type] - 1;
  let html = '';
  switch(type) {
    case 'education':
      html = `<div class="section education" data-idx="${idx}">
        <h3>Education</h3>
        <input type="text" placeholder="Degree" name="education-degree-${idx}" required>
        <input type="text" placeholder="Institution" name="education-institution-${idx}" required>
        <input type="text" placeholder="Year" name="education-year-${idx}">
        <button type="button" onclick="this.parentElement.remove();">Remove</button>
      </div>`;
      break;
    case 'project':
      html = `<div class="section project" data-idx="${idx}">
        <h3>Project</h3>
        <input type="text" placeholder="Project Title" name="project-title-${idx}" required>
        <textarea placeholder="Description" name="project-desc-${idx}"></textarea>
        <button type="button" onclick="this.parentElement.remove();">Remove</button>
      </div>`;
      break;
    case 'experience':
      html = `<div class="section experience" data-idx="${idx}">
        <h3>Experience</h3>
        <input type="text" placeholder="Job Title" name="experience-title-${idx}" required>
        <input type="text" placeholder="Company" name="experience-company-${idx}" required>
        <input type="text" placeholder="Year" name="experience-year-${idx}">
        <textarea placeholder="Description" name="experience-desc-${idx}"></textarea>
        <button type="button" onclick="this.parentElement.remove();">Remove</button>
      </div>`;
      break;
    case 'skill':
      html = `<div class="section skill" data-idx="${idx}">
        <h3>Skill</h3>
        <input type="text" placeholder="Skill" name="skill-name-${idx}" required>
        <button type="button" onclick="this.parentElement.remove();">Remove</button>
      </div>`;
      break;
    case 'certification':
      html = `<div class="section certification" data-idx="${idx}">
        <h3>Certification</h3>
        <input type="text" placeholder="Certification Name" name="certification-name-${idx}" required>
        <input type="text" placeholder="Authority" name="certification-authority-${idx}">
        <input type="text" placeholder="Year" name="certification-year-${idx}">
        <button type="button" onclick="this.parentElement.remove();">Remove</button>
      </div>`;
      break;
    case 'language':
      html = `<div class="section language" data-idx="${idx}">
        <h3>Language</h3>
        <input type="text" placeholder="Language" name="language-name-${idx}" required>
        <input type="text" placeholder="Proficiency" name="language-proficiency-${idx}">
        <button type="button" onclick="this.parentElement.remove();">Remove</button>
      </div>`;
      break;
    case 'award':
      html = `<div class="section award" data-idx="${idx}">
        <h3>Award</h3>
        <input type="text" placeholder="Award Title" name="award-title-${idx}" required>
        <input type="text" placeholder="Year" name="award-year-${idx}">
        <button type="button" onclick="this.parentElement.remove();">Remove</button>
      </div>`;
      break;
    case 'interest':
      html = `<div class="section interest" data-idx="${idx}">
        <h3>Interest</h3>
        <input type="text" placeholder="Interest" name="interest-name-${idx}" required>
        <button type="button" onclick="this.parentElement.remove();">Remove</button>
      </div>`;
      break;
    case 'reference':
      html = `<div class="section reference" data-idx="${idx}">
        <h3>Reference</h3>
        <input type="text" placeholder="Name" name="reference-name-${idx}" required>
        <input type="text" placeholder="Contact" name="reference-contact-${idx}">
        <input type="text" placeholder="Relation" name="reference-relation-${idx}">
        <button type="button" onclick="this.parentElement.remove();">Remove</button>
      </div>`;
      break;
  }
  dynamicSections.insertAdjacentHTML('beforeend', html);
}

// Update resume data and preview on input change
form.oninput = updateResumeData;
templateSelector.onchange = updatePreview;

profileImageInput.onchange = function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      profileImageDataUrl = evt.target.result;
      document.getElementById('profile-image-preview')?.remove();
      const img = document.createElement('img');
      img.src = profileImageDataUrl;
      img.className = 'profile-image-preview';
      profileImageInput.parentElement.insertBefore(img, profileImageInput);
      updateResumeData();
    };
    reader.readAsDataURL(file);
  }
};

// Dark mode toggle logic
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.onclick = function() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
};
// On load, set dark mode if preferred
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}

function updateResumeData() {
  const formData = new FormData(form);
  resumeData.name = formData.get('name') || '';
  resumeData.email = formData.get('email') || '';
  resumeData.phone = formData.get('phone') || '';
  resumeData.about = formData.get('about') || '';
  // Parse dynamic sections
  resumeData.education = [];
  resumeData.projects = [];
  resumeData.experience = [];
  resumeData.skills = [];
  resumeData.certifications = [];
  resumeData.languages = [];
  resumeData.awards = [];
  resumeData.interests = [];
  resumeData.references = [];
  dynamicSections.querySelectorAll('.education').forEach(section => {
    resumeData.education.push({
      degree: section.querySelector('[placeholder="Degree"]').value,
      institution: section.querySelector('[placeholder="Institution"]').value,
      year: section.querySelector('[placeholder="Year"]').value
    });
  });
  dynamicSections.querySelectorAll('.project').forEach(section => {
    resumeData.projects.push({
      title: section.querySelector('[placeholder="Project Title"]').value,
      desc: section.querySelector('[placeholder="Description"]').value
    });
  });
  dynamicSections.querySelectorAll('.experience').forEach(section => {
    resumeData.experience.push({
      title: section.querySelector('[placeholder="Job Title"]').value,
      company: section.querySelector('[placeholder="Company"]').value,
      year: section.querySelector('[placeholder="Year"]').value,
      desc: section.querySelector('[placeholder="Description"]').value
    });
  });
  dynamicSections.querySelectorAll('.skill').forEach(section => {
    resumeData.skills.push({
      name: section.querySelector('[placeholder="Skill"]').value
    });
  });
  dynamicSections.querySelectorAll('.certification').forEach(section => {
    resumeData.certifications.push({
      name: section.querySelector('[placeholder="Certification Name"]').value,
      authority: section.querySelector('[placeholder="Authority"]').value,
      year: section.querySelector('[placeholder="Year"]').value
    });
  });
  dynamicSections.querySelectorAll('.language').forEach(section => {
    resumeData.languages.push({
      name: section.querySelector('[placeholder="Language"]').value,
      proficiency: section.querySelector('[placeholder="Proficiency"]').value
    });
  });
  dynamicSections.querySelectorAll('.award').forEach(section => {
    resumeData.awards.push({
      title: section.querySelector('[placeholder="Award Title"]').value,
      year: section.querySelector('[placeholder="Year"]').value
    });
  });
  dynamicSections.querySelectorAll('.interest').forEach(section => {
    resumeData.interests.push({
      name: section.querySelector('[placeholder="Interest"]').value
    });
  });
  dynamicSections.querySelectorAll('.reference').forEach(section => {
    resumeData.references.push({
      name: section.querySelector('[placeholder="Name"]').value,
      contact: section.querySelector('[placeholder="Contact"]').value,
      relation: section.querySelector('[placeholder="Relation"]').value
    });
  });
  resumeData.profileImage = profileImageDataUrl;
  updatePreview();
}

function updatePreview() {
  const template = templateSelector.value;
  fetch(`templates/${template}.html`)
    .then(res => res.text())
    .then(templateHtml => {
      // Replace placeholders in template
      let html = templateHtml
        .replace(/{{profileImage}}/g, resumeData.profileImage ? `<img src="${resumeData.profileImage}" class="profile-image-preview" alt="Profile Image">` : '')
        .replace(/{{name}}/g, resumeData.name)
        .replace(/{{email}}/g, resumeData.email)
        .replace(/{{phone}}/g, resumeData.phone)
        .replace(/{{about}}/g, resumeData.about)
        .replace(/{{education}}/g, resumeData.education.map(e => `<div><b>${e.degree}</b>, ${e.institution} (${e.year})</div>`).join(''))
        .replace(/{{projects}}/g, resumeData.projects.map(p => `<div><b>${p.title}</b><br>${p.desc}</div>`).join(''))
        .replace(/{{experience}}/g, resumeData.experience.map(ex => `<div><b>${ex.title}</b> at ${ex.company} (${ex.year})<br>${ex.desc}</div>`).join(''))
        .replace(/{{skills}}/g, resumeData.skills.map(s => `<span>${s.name}</span>`).join(', '))
        .replace(/{{certifications}}/g, resumeData.certifications.map(c => `<div><b>${c.name}</b> (${c.authority}, ${c.year})</div>`).join(''))
        .replace(/{{languages}}/g, resumeData.languages.map(l => `<div><b>${l.name}</b> - ${l.proficiency}</div>`).join(''))
        .replace(/{{awards}}/g, resumeData.awards.map(a => `<div><b>${a.title}</b> (${a.year})</div>`).join(''))
        .replace(/{{interests}}/g, resumeData.interests.map(i => `<span>${i.name}</span>`).join(', '))
        .replace(/{{references}}/g, resumeData.references.map(r => `<div><b>${r.name}</b> (${r.relation}): ${r.contact}</div>`).join(''));
      const doc = previewFrame.contentDocument || previewFrame.contentWindow.document;
      doc.open();
      doc.write(html);
      doc.close();
    });
}

// Initial preview
updatePreview();

// Placeholder for AI assistant integration
// See ai-assistant.js for details
