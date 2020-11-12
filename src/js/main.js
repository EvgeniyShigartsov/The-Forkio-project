window.addEventListener('click', toggleBurger);
function toggleBurger(event){
    const burger= document.querySelector('.burger');
    const navigation = document.querySelector('.navigation ');
    const isParentExistNav = event.target.closest('.navigation');
    const isParentExistBurger = event.target.closest('.burger');
    
    if (isParentExistBurger){
        burger.classList.toggle('active');
        navigation.classList.toggle('active');
    } else if (burger.classList.contains('active') && navigation.classList.contains('active') && isParentExistBurger === null && isParentExistNav === null){
        burger.classList.remove('active');
        navigation.classList.remove('active');
    }
};