const fs = require('fs');

fs.readFile('blog.md', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    fetch('https://api.medium.com/v1/users/{userId}/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ----',
        },
        body: JSON.stringify({
            title: 'Test',
            contentFormat: 'markdown',
            content: data,  // Use the content read from the markdown file
            canonicalUrl: '',
            tags: ['test', 'test2', 'test3'],
            publishStatus: 'public',
        }),
    })
        .then(res => res.json())
        .then(res => console.log(JSON.stringify(res)))
});