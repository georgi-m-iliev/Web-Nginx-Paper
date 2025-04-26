export function fetchSections(sections) {
    const fetchPromises = sections.map(section => {
        return fetch(section.file)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Грешка при зареждане на ${section.file}`);
                }
                return response.text();
            })
            .then(html => {
                document.getElementById(section.id).innerHTML = html;
            })
            .catch(error => {
                console.error(error);
                document.getElementById(section.id).innerHTML = "<p>Грешка при зареждане на съдържанието.</p>";
            });
    });

    return Promise.all(fetchPromises);
}
