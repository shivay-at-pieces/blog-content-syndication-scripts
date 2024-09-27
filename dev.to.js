const fs = require('fs');

fs.readFile('blog.md', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data)
    fetch('https://dev.to/api/articles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': '',
        },
        // body: JSON.stringify({
        //   article: {
        //     title: 'test! blog post',
        //     published: true,
        //     content: data,
        //     tags: ['discuss', 'help'],
        //     series: 'Hello series',
        //   },
        // }),
        body: JSON.stringify({
            article: {
                title: 'Hello, World!',
                published: true,
                content: '# You can put Markdown here.\n***\n',
                tags: ['discuss', 'help'],
                series: 'Hello series',
            },
        }),
    })
        .then(res => res.json())
        .then(res => console.log(JSON.stringify(res)))
});