const db = require('../util/database');

// save one post
exports.save = (postData) => {
    const userId = postData.userId;
    const media = postData.media;
    const postContent = postData.postContent;

    return db.execute('INSERT INTO posts ( user_id, media, post_content ) VALUES (?,?,?)',
    [ userId, media, postContent ]);
};

// fetch all posts
exports.fetchAll = () => {
    return db.execute(` 
    SELECT post_id, post_content, media, date, fname, lname
    FROM posts 
    JOIN users 
    ON posts.user_id = users.id
    ORDER BY date DESC
    `);
};

exports.getById = (id) => {
    return db.execute(`
        SELECT * FROM posts WHERE post_id = (?)
        `, [id]);
}


exports.deleteById = (id) => {
    return db.execute(`
        DELETE FROM posts WHERE post_id = (?)
    `, [id]);
};

exports.editById = ( id, post_content ) => {
    return db.execute(`
        UPDATE posts SET post_content = (?) WHERE post_id = (?)
    `, [ post_content, id ]);
};