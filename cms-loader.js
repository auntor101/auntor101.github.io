/**
 * CMS Data Loader
 * Fetches JSON data from _data folder and dynamically populates the pages
 */

class CMSLoader {
    constructor() {
        this.dataPath = '_data';
        this.cache = {};
    }

    async fetchJSON(filename) {
        if (this.cache[filename]) {
            return this.cache[filename];
        }
        try {
            const response = await fetch(`${this.dataPath}/${filename}`);
            if (!response.ok) throw new Error(`Failed to fetch ${filename}`);
            const data = await response.json();
            this.cache[filename] = data;
            return data;
        } catch (error) {
            console.warn(`Could not load ${filename}:`, error);
            return null;
        }
    }

    // Helper to parse comma-separated tags
    parseTags(tagString) {
        if (!tagString) return [];
        return tagString.split(',').map(t => t.trim()).filter(t => t);
    }

    // Helper to parse newline-separated items
    parseLines(text) {
        if (!text) return [];
        return text.split('\n').map(t => t.trim()).filter(t => t);
    }

    // Load personal info for index page
    async loadPersonalInfo() {
        const data = await this.fetchJSON('personal.json');
        if (!data) return;

        // Update hero section
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) heroTitle.textContent = data.name;

        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) heroSubtitle.textContent = data.tagline;

        const currentPosition = document.querySelector('.current-position span');
        if (currentPosition) currentPosition.textContent = data.current_position;

        // Update nav logo
        const navLogo = document.querySelector('.nav-logo');
        if (navLogo) navLogo.textContent = data.name;

        // Update social links
        const emailLink = document.querySelector('.social-links a[aria-label="Email"]');
        if (emailLink && data.email) emailLink.href = `mailto:${data.email}`;

        const githubLink = document.querySelector('.social-links a[aria-label="GitHub"]');
        if (githubLink && data.github) githubLink.href = data.github;

        const linkedinLink = document.querySelector('.social-links a[aria-label="LinkedIn"]');
        if (linkedinLink && data.linkedin) linkedinLink.href = data.linkedin;

        const scholarLink = document.querySelector('.social-links a[aria-label="Google Scholar"]');
        if (scholarLink && data.scholar) scholarLink.href = data.scholar;

        // Update about section
        const aboutTexts = document.querySelectorAll('.about-text p');
        if (aboutTexts.length >= 1 && data.about_p1) aboutTexts[0].textContent = data.about_p1;
        if (aboutTexts.length >= 2 && data.about_p2) aboutTexts[1].textContent = data.about_p2;
        if (aboutTexts.length >= 3 && data.about_p3) aboutTexts[2].textContent = data.about_p3;

        // Update profile picture
        if (data.profile_pic) {
            const avatar = document.querySelector('.avatar');
            if (avatar) {
                avatar.innerHTML = `<img src="${data.profile_pic}" alt="Profile" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
            }
        }

        // Update CV link
        const cvButton = document.getElementById('downloadCV');
        if (cvButton && data.cv_pdf) {
            cvButton.href = data.cv_pdf;
            cvButton.removeAttribute('onclick');
        }
    }

    // Load publications
    async loadPublications() {
        const data = await this.fetchJSON('publications.json');
        if (!data || !data.items) return;

        const container = document.querySelector('.publications-container');
        if (!container) return;

        // Clear existing content
        container.innerHTML = '';

        // Separate published and in-preparation
        const published = data.items.filter(p => p.status === 'Published');
        const inPrep = data.items.filter(p => p.status === 'In Preparation');

        if (published.length > 0) {
            container.innerHTML += `<h2 class="pub-section-title"><i class="fas fa-book"></i> Published</h2>`;
            published.forEach(pub => {
                container.innerHTML += this.createPublicationCard(pub);
            });
        }

        if (inPrep.length > 0) {
            container.innerHTML += `<h2 class="pub-section-title"><i class="fas fa-flask"></i> In Preparation</h2>`;
            inPrep.forEach(pub => {
                container.innerHTML += this.createPublicationCard(pub);
            });
        }
    }

    createPublicationCard(pub) {
        const typeClass = pub.type.toLowerCase();
        const tags = this.parseTags(pub.tags);
        const tagsHtml = tags.length > 0 ? `
            <div class="tech-tags">
                ${tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
            </div>
        ` : '';

        return `
            <div class="publication-card">
                <span class="pub-type ${typeClass === 'preprint' ? 'preprint' : typeClass}">${pub.type}</span>
                <h3>${pub.title}</h3>
                <p class="authors">${pub.authors}</p>
                <p class="venue"><i class="fas fa-book"></i> ${pub.venue}</p>
                <div class="pub-abstract">
                    <p>${pub.abstract}</p>
                </div>
                ${tagsHtml}
                <div class="pub-links">
                    ${pub.pdf ? `<a href="${pub.pdf}" class="pub-link"><i class="fas fa-file-pdf"></i> PDF</a>` : ''}
                    ${pub.link ? `<a href="${pub.link}" class="pub-link"><i class="fas fa-external-link-alt"></i> Link</a>` : ''}
                </div>
            </div>
        `;
    }

    // Load experience
    async loadExperience() {
        const data = await this.fetchJSON('experience.json');
        if (!data || !data.items) return;

        const timeline = document.querySelector('.timeline');
        if (!timeline) return;

        timeline.innerHTML = data.items.map(exp => {
            const descriptions = this.parseLines(exp.description);
            const tags = this.parseTags(exp.tech_tags);
            const dateRange = exp.current ? `${exp.start_date} - Present` : `${exp.start_date} - ${exp.end_date}`;

            return `
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <span class="timeline-date">${dateRange}</span>
                        <h3>${exp.position}</h3>
                        <h4>${exp.company}</h4>
                        <p class="location"><i class="fas fa-map-marker-alt"></i> ${exp.location}</p>
                        <ul>
                            ${descriptions.map(d => `<li>${d}</li>`).join('')}
                        </ul>
                        <div class="tech-tags">
                            ${tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Load projects
    async loadProjects() {
        const data = await this.fetchJSON('projects.json');
        if (!data || !data.items) return;

        const grid = document.querySelector('.projects-grid');
        if (!grid) return;

        grid.innerHTML = data.items.map(project => {
            const tags = this.parseTags(project.tech_tags);

            return `
                <div class="project-card">
                    <div class="project-icon">
                        <i class="${project.icon}"></i>
                    </div>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tech-tags">
                        ${tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                    </div>
                    ${project.github_url ? `
                        <a href="${project.github_url}" target="_blank" class="project-link">
                            <i class="fab fa-github"></i> View on GitHub
                        </a>
                    ` : ''}
                    ${project.demo_url ? `
                        <a href="${project.demo_url}" target="_blank" class="project-link">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                    ` : ''}
                </div>
            `;
        }).join('');
    }

    // Load research
    async loadResearch() {
        const data = await this.fetchJSON('research.json');
        if (!data || !data.items) return;

        const list = document.querySelector('.research-list');
        if (!list) return;

        list.innerHTML = data.items.map(research => {
            const contributions = this.parseLines(research.contributions);
            const tags = this.parseTags(research.tech_tags);
            const statusClass = research.status.toLowerCase().replace(/\s+/g, '-').replace('manuscript-in-preparation', 'preparation');

            return `
                <div class="research-card">
                    <div class="research-header">
                        <h3>${research.title}</h3>
                        <span class="status-badge ${statusClass}">${research.status}</span>
                    </div>
                    <div class="research-meta">
                        <div class="research-info">
                            <i class="fas fa-building"></i>
                            <span>${research.organization}</span>
                        </div>
                        <div class="research-info">
                            <i class="fas fa-calendar"></i>
                            <span>${research.start_date} - ${research.end_date}</span>
                        </div>
                    </div>
                    <div class="research-description">
                        <p>${research.description}</p>
                        <div class="research-achievements">
                            <h4>Key Contributions:</h4>
                            <ul>
                                ${contributions.map(c => `<li>${c}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="tech-tags">
                            ${tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Load education
    async loadEducation() {
        const data = await this.fetchJSON('education.json');
        if (!data || !data.items) return;

        const timeline = document.querySelector('.education-timeline');
        if (!timeline) return;

        timeline.innerHTML = data.items.map(edu => {
            const dateRange = edu.start_year === edu.end_year 
                ? edu.end_year 
                : `${edu.start_year} - ${edu.end_year}`;

            let thesisHtml = '';
            if (edu.thesis) {
                thesisHtml = `
                    <div class="thesis-section">
                        <h5><i class="fas fa-graduation-cap"></i> Thesis</h5>
                        <p><strong>${edu.thesis}</strong></p>
                        ${edu.thesis_abstract ? `<p class="thesis-abstract">${edu.thesis_abstract}</p>` : ''}
                    </div>
                `;
            }

            return `
                <div class="education-card">
                    <div class="edu-header">
                        <h3>${edu.degree}</h3>
                        <span class="edu-date">${dateRange}</span>
                    </div>
                    <h4>${edu.institution}</h4>
                    <p class="location"><i class="fas fa-map-marker-alt"></i> ${edu.location}</p>
                    <div class="edu-details">
                        <div class="cgpa-badge">GPA: ${edu.gpa}</div>
                        ${thesisHtml}
                    </div>
                </div>
            `;
        }).join('');
    }

    // Load achievements
    async loadAchievements() {
        const data = await this.fetchJSON('achievements.json');
        if (!data || !data.items) return;

        const grid = document.querySelector('.achievements-grid');
        if (!grid) return;

        grid.innerHTML = data.items.map(achievement => `
            <div class="achievement-card">
                <i class="${achievement.icon}"></i>
                <h3>${achievement.title}</h3>
                <p>${achievement.description}</p>
                <span class="achievement-year">${achievement.year}</span>
            </div>
        `).join('');
    }

    // Load extracurricular activities
    async loadExtracurricular() {
        const data = await this.fetchJSON('extracurricular.json');
        if (!data || !data.items) return;

        const list = document.querySelector('.activities-list');
        if (!list) return;

        list.innerHTML = data.items.map(activity => `
            <div class="activity-card">
                <div class="activity-icon">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <h3>${activity.title}</h3>
                    <h4>${activity.organization}</h4>
                    <span class="activity-date">${activity.date}</span>
                    <p>${activity.description}</p>
                </div>
            </div>
        `).join('');
    }

    // Load skills
    async loadSkills() {
        const data = await this.fetchJSON('skills.json');
        if (!data || !data.categories) return;

        const grid = document.querySelector('.skills-grid');
        if (!grid) return;

        grid.innerHTML = data.categories.map(category => {
            const skills = this.parseTags(category.skills);
            return `
                <div class="skill-category">
                    <h3><i class="${category.icon}"></i> ${category.name}</h3>
                    <div class="skill-tags">
                        ${skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }

    // Initialize loader based on current page
    async init() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        // Always load personal info for nav logo
        const personal = await this.fetchJSON('personal.json');
        if (personal) {
            const navLogo = document.querySelector('.nav-logo');
            if (navLogo) navLogo.textContent = personal.name;
        }

        // Load page-specific content
        switch (currentPage) {
            case 'index.html':
            case '':
                await this.loadPersonalInfo();
                break;
            case 'publications.html':
                await this.loadPublications();
                break;
            case 'experience.html':
                await this.loadExperience();
                break;
            case 'projects.html':
                await this.loadProjects();
                break;
            case 'research.html':
                await this.loadResearch();
                break;
            case 'education.html':
                await this.loadEducation();
                await this.loadAchievements();
                await this.loadExtracurricular();
                break;
            case 'skills.html':
                await this.loadSkills();
                break;
            case 'contact.html':
                // Load contact info from personal.json
                if (personal) {
                    const emailEl = document.querySelector('.contact-email');
                    if (emailEl) emailEl.textContent = personal.email;
                    const phoneEl = document.querySelector('.contact-phone');
                    if (phoneEl) phoneEl.textContent = personal.phone;
                    const locationEl = document.querySelector('.contact-location');
                    if (locationEl) locationEl.textContent = personal.location;
                }
                break;
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const cmsLoader = new CMSLoader();
    cmsLoader.init();
});
