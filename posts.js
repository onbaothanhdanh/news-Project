document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addPostForm').addEventListener('submit', function(event) {
        event.preventDefault();
        addPost();
    });

    document.getElementById('saveEditButton').addEventListener('click', saveEdit);
    document.getElementById('cancelEditButton').addEventListener('click', cancelEdit);

    loadPosts();
});

function addPost() {
    var title = document.getElementById('title').value;
    var category = document.getElementById('category').value;
    var content = document.getElementById('content').value;
    var hotNews = document.getElementById('hotNews').checked;

    var post = {
        id: generateId(),
        title: title,
        category: category,
        content: content,
        hotNews: hotNews
    };

    var postList = document.getElementById('postList');
    var listItem = createPostElement(post);
    postList.appendChild(listItem);

    savePost(post);
}

function createPostElement(post) {
    var listItem = document.createElement('li');
    listItem.classList.add('post-item');
    listItem.innerHTML = `
        <div class="post-info">
            <div class="post-content">
                <strong class="post-title">${post.title}</strong><br>
                <em class="post-category">${post.category}</em><br>
                <span class="post-content">${post.content.substring(0, 100)}...</span><br>
                ${post.hotNews ? '<span class="post-hot-news" style="color:red;">Hot News</span>' : ''}
                <button class="edit-button" onclick="editPost('${post.id}')">Edit</button>
                <button class="delete-button" onclick="deletePost('${post.id}')">Delete</button>
            </div>
        </div>
    `;
    return listItem;
}

function savePost(post) {
    var posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
}

function loadPosts() {
    var posts = JSON.parse(localStorage.getItem('posts')) || [];
    var postList = document.getElementById('postList');
    postList.innerHTML = '';
    posts.forEach(function(post) {
        var listItem = createPostElement(post);
        postList.appendChild(listItem);
    });
}

function generateId() {
    return 'post-' + Date.now();
}

function editPost(postId) {
    var posts = JSON.parse(localStorage.getItem('posts')) || [];
    var post = posts.find(function(post) {
        return post.id === postId;
    });

    document.getElementById('editPostId').value = post.id;
    document.getElementById('editTitle').value = post.title;
    document.getElementById('editCategory').value = post.category;
    document.getElementById('editContent').value = post.content;
    document.getElementById('editHotNews').checked = post.hotNews;

    document.getElementById('editForm').style.display = 'block';
}

function saveEdit() {
    var postId = document.getElementById('editPostId').value;
    var editedTitle = document.getElementById('editTitle').value;
    var editedCategory = document.getElementById('editCategory').value;
    var editedContent = document.getElementById('editContent').value;
    var editedHotNews = document.getElementById('editHotNews').checked;

    var posts = JSON.parse(localStorage.getItem('posts')) || [];
    var postIndex = posts.findIndex(function(post) {
        return post.id === postId;
    });

    if (postIndex !== -1) {
        posts[postIndex].title = editedTitle;
        posts[postIndex].category = editedCategory;
        posts[postIndex].content = editedContent;
        posts[postIndex].hotNews = editedHotNews;

        localStorage.setItem('posts', JSON.stringify(posts));
        document.getElementById('editForm').style.display = 'none';
        loadPosts();
    }
}

function cancelEdit() {
    document.getElementById('editForm').style.display = 'none';
}

function deletePost(postId) {
    var confirmDelete = confirm("Bạn có chắc chắn muốn xóa bài viết này?");
    if (confirmDelete) {
        var posts = JSON.parse(localStorage.getItem('posts')) || [];
        var updatedPosts = posts.filter(function(post) {
            return post.id !== postId;
        });
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        loadPosts();
    }
}