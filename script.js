const mainSection=document.querySelector('section.main');
function createTemplate(obj){
    const container=document.createElement('div');
    container.className='container'
     container.innerHTML=`
        <div class="wrapper">
            <div class="box post">
                <div class="vote">
                    <img src="images/icon-plus.svg" class="plus">
                    <div class="number">${obj.comments[0].score}</div>
                    <img src="images/icon-minus.svg" class="minus">
                </div>
                <div class="content">
                    <div class="header">
                        <img src=${obj.comments[0].user.image.png}>
                        <h3 class="name">${obj.comments[0].user.username}</h3>
                        <p class="time">${obj.comments[0].createdAt}</p>
                    </div>
                    <div class="text">
                    ${obj.comments[0].content}
                    </div>
                    <div class="action">
                        <div class="reply"><img src="images/icon-reply.svg"> Reply</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="wrapper">
            <div class="box post">
                <div class="vote">
                    <img src="images/icon-plus.svg" class="plus">
                    <div class="number">${obj.comments[1].score}</div>
                    <img src="images/icon-minus.svg" class="minus">
                </div>
                <div class="content">
                    <div class="header">
                        <img src=${obj.comments[1].user.image.png}>
                        <h3 class="name">${obj.comments[1].user.username}</h3>
                        <p class="time">${obj.comments[1].createdAt}</p>
                    </div>
                    <div class="text">${obj.comments[1].content}</div>
                    <div class="action">
                    <div class="reply"><img src="images/icon-reply.svg"> Reply</div>
                    </div>
                </div>
            </div>
            <div class="box reply-content">
            <div class="vote">
                <img src="images/icon-plus.svg" class="plus">
                <div class="number">${obj.comments[1].replies[0].score}</div>
                <img src="images/icon-minus.svg" class="minus">
            </div>
            <div class="content">
                <div class="header">
                <img src=${obj.comments[1].replies[0].user.image.png}>
                <h3 class="name">${obj.comments[1].replies[0].user.username}</h3>
                <p class="time">${obj.comments[1].replies[0].createdAt}</p>
                </div>
                <div class="text">
                <span><span class="mention">@${obj.comments[1].replies[0].replyingTo}</span><p> ${obj.comments[1].replies[0].content}</p></span>
                </div>
                <div class="action">
                <div class="reply"><img src="images/icon-reply.svg"> Reply</div>
                </div>
            </div>
            </div>
            <div class="box reply-content your">
            <div class="vote">
                <img src="images/icon-plus.svg" class="plus">
                <div class="number">${obj.comments[1].replies[1].score}</div>
                <img src="images/icon-minus.svg" class="minus">
            </div>
            <div class="content">
                <div class="header">
                    <img src=${obj.comments[1].replies[1].user.image.png}>
                    <h3 class="name">${obj.comments[1].replies[1].user.username}</h3>
                    <span class='you'>you</span>
                    <p class="time">${obj.comments[1].replies[1].createdAt}</p>
                </div>
                <div class="text">
                <span><span class="mention">@${obj.comments[1].replies[1].replyingTo}</span><p> ${obj.comments[1].replies[1].content}</p></span>
                </div>
                <div class="action">
                    <div class="delete"><img src="images/icon-delete.svg"> delete</div>
                    <div class="edit"><img src="images/icon-edit.svg" >Edit</div>
                </div>
            </div>
            </div>
        </div>
        <div class="comment">
        <img src=${obj.currentUser.image.png}>
        <textarea class="text" cols="30" rows="10" placeholder="Add Comment"></textarea>
        <button class="btn add-comment">Send</button>
        </div>
        `
mainSection.appendChild(container);
}


function wrapperReply(){
    document.querySelectorAll('.wrapper').forEach((el)=>{
        el.querySelectorAll('.action .reply').forEach((item)=>{
            item.addEventListener('click',()=>{
                createReplyForm(item);
                lestenReplyText(el,item.closest('.box'));
        })
        })
    })
    
    document.querySelectorAll('.delete').forEach((item)=>{
        item.addEventListener('click',()=>{
            if(item.closest('.box').classList.contains('post')){
                item.closest('.wrapper').remove();
            }else{
                item.closest('.box.your').remove();
            }
        })
    }) 
    document.querySelectorAll('.edit').forEach((item)=>{
        item.addEventListener('click',()=>{
            let box=item.closest('.box');
            let text=box.querySelector('.text p').textContent;
            box.querySelector('.text span p').innerHTML=`
                <div class='text-wrapper'><textarea>${text}</textarea><button class="btn add-edit">Update</button></div>
            `;
            box.querySelector('.btn.add-edit').addEventListener('click',()=>{
                let text=box.querySelector('textarea').value;
                box.querySelector('.text span p').innerHTML=text;
            })
        })
    }) 
    vote()
}

function createReplyForm(item){
    document.querySelectorAll('.reply-form').forEach((el)=>{
        el.remove();
    })
    const replyForm=document.createElement('div');
    replyForm.className='reply-form';
    replyForm.innerHTML=`
          <img src="./images/avatars/image-juliusomo.png">
          <textarea class="text" cols="30" rows="10" placeholder='Add Reply'></textarea>
          <button class="btn add-reply">REPLY</button>
    `;
    insertAfter(replyForm, item.closest('.box'));
    wrapperReply();//to update the (seloctor all) in the function after creating new elements
}

function lestenReplyText(wrapper,thePost){
    wrapper.querySelectorAll('.btn.add-reply').forEach((item)=>{
        item.addEventListener('click',()=>{
            let replyText=wrapper.querySelector('textarea').value;
            if(replyText!=''&&replyText.trim()!=0){
                wrapper.querySelector('textarea').value='';
                console.log(item.closest('.box'))
                createReplyContent(wrapper,replyText,thePost.querySelector('.name').textContent);
                wrapper.querySelector('.reply-form').remove();
            }
            
        })
    })
}

function createReplyContent(el,text,thePostName){
    const replyContent=document.createElement('div');
    replyContent.className='box reply-content your';
    replyContent.innerHTML=`
    <div class="vote">
        <img src="images/icon-plus.svg" class="plus">
        <div class="number">0</div>
        <img src="images/icon-minus.svg" class="minus">
    </div>
    <div class="content">
        <div class="header">
            <img src="./images/avatars/image-juliusomo.png">
            <h3 class="name">hasan</h3>
            <span class='you'>you</span>
            <p class="time">Seconds ago</p>
        </div>
        <div class="text">
            <span><span class="mention">@${thePostName}</span><p> ${text}</p></span>
        </div>
        <div class="action">
            <div class="delete"><img src="images/icon-delete.svg"> delete</div>
            <div class="edit"><img src="images/icon-edit.svg" >Edit</div>
        </div>
    </div>
    `;
    el.appendChild(replyContent);
    wrapperReply();//to update the (seloctor all) in the function after creating new elements
}


//add comment
function lestenCommentText(){
    let commentText=document.querySelector('.comment textarea').value;
    if(commentText!=''&&commentText.trim()!=0){
        addComment(commentText);
    }
}
function addComment(text){
    const wrapper=document.createElement('div');
    wrapper.className='wrapper';
    wrapper.innerHTML=`
    <div class='box post your'>
        <div class="vote">
            <img src="images/icon-plus.svg" class="plus">
            <div class="number">0</div>
            <img src="images/icon-minus.svg" class="minus">
        </div>
        <div class="content">
            <div class="header">
                <img src="./images/avatars/image-juliusomo.png">
                <h3 class="name">hasan</h3>
                <span class='you'>you</span>
                <p class="time">Seconds ago</p>
            </div>
            <div class="text">
                <span><p>${text}</p></span>
            </div>
            <div class="action">
                <div class="delete"><img src="images/icon-delete.svg"> delete</div>
                <div class="edit"><img src="images/icon-edit.svg" >Edit</div>
            </div>
        </div>
    </div>
    `
    document.querySelector('.container').insertBefore(wrapper,document.querySelector('.comment'))
    wrapperReply();
}
function insertAfter(newNode, referenceNode) {
    referenceNode.parentElement.insertBefore(newNode, referenceNode.nextSibling)
}

function vote(){
    const plus=document.querySelectorAll('.plus');
    const minus=document.querySelectorAll('.minus');
    plus.forEach((el)=>{
        el.addEventListener('click',()=>{
            let voteNumber=el.closest('.vote').querySelector('.number');
            const theSiblingMinus=el.closest('.vote').querySelector('.minus');
            if(!el.classList.contains('active')&&!theSiblingMinus.classList.contains('active')){
                el.classList.add('active');
                theSiblingMinus.classList.remove('active');
                voteNumber.textContent=parseInt(voteNumber.textContent)+1;
            }else if(!el.classList.contains('active')&&theSiblingMinus.classList.contains('active')){
                theSiblingMinus.classList.remove('active');
                voteNumber.textContent=parseInt(voteNumber.textContent)+1;
            }
            else{
                alert('you have voted')
            }
        })
    })
    minus.forEach((el)=>{
        el.addEventListener('click',()=>{
            let voteNumber=el.closest('.vote').querySelector('.number');
            const theSiblingPlus=el.closest('.vote').querySelector('.plus');
            if(!el.classList.contains('active')&&!theSiblingPlus.classList.contains('active')){
                el.classList.add('active');
                theSiblingPlus.classList.remove('active');
                voteNumber.textContent=parseInt(voteNumber.textContent)-1;
            }else if(!el.classList.contains('active')&&theSiblingPlus.classList.contains('active')){
                theSiblingPlus.classList.remove('active');
                voteNumber.textContent=parseInt(voteNumber.textContent)-1;
            }
            else{
                alert('you have voted')
            }
        })
    })
}
fetch('data.json').then((res)=>{
    return res.json()
}).then((data)=>{
    createTemplate(data);
    wrapperReply()//its the main function in the script
    document.querySelector('.comment .btn.add-comment').addEventListener('click',()=>{
        lestenCommentText();
    })
})