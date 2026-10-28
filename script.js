const $ = id => document.getElementById(id);

$('box13_login')?.addEventListener('click', () => {
    if ($('box67_user').value.trim() === '1234' && $('box67_pass').value.trim() === '1234') {
        $('box63').style.opacity = '0';
        setTimeout(() => {
            $('box63').style.display = 'none';
            $('box69').classList.add('box69_visible');
        }, 800);
    } else {
        $('box68_error').textContent = 'Login yoki parol xato!';
    }
});

const toggleDrawer = drawer => {
    document.querySelectorAll('.box75_cart').forEach(d => d !== drawer && d.classList.remove('cart_open'));
    drawer.classList.toggle('cart_open');
    $('box75_overlay').classList.toggle('overlay_open');
};

$('box33_cart_toggle')?.addEventListener('click', () => toggleDrawer($('box75_cart')));
$('box33_wish_toggle')?.addEventListener('click', () => toggleDrawer($('box75_wish')));
$('box75_close')?.addEventListener('click', () => toggleDrawer($('box75_cart')));
$('box75_close_wish')?.addEventListener('click', () => toggleDrawer($('box75_wish')));
$('box75_overlay')?.addEventListener('click', () => {
    document.querySelectorAll('.box75_cart').forEach(d => d.classList.remove('cart_open'));
    $('box75_overlay').classList.remove('overlay_open');
});

let cart = [], wishlist = [];

document.querySelectorAll('.filter_btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter_btn').forEach(b => b.classList.remove('filter_active'));
        btn.classList.add('filter_active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.box28').forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

document.querySelectorAll('.add_to_cart_btn').forEach(btn => {
    btn.addEventListener('click', e => {
        const card = e.target.closest('.box28');
        const id = card.dataset.id;
        const item = cart.find(i => i.id === id);
        if (item) item.qty++;
        else cart.push({ id, title: card.dataset.title, price: parseFloat(card.dataset.price), qty: 1 });
        updateCart();
        btn.textContent = "Qo'shildi!";
        setTimeout(() => btn.textContent = 'Qo\'shish', 1200);
    });
});

document.querySelectorAll('.wishlist_overlay_btn').forEach(btn => {
    btn.addEventListener('click', e => {
        const card = e.target.closest('.box28');
        const id = card.dataset.id;
        const title = card.dataset.title;
        const index = wishlist.findIndex(i => i.id === id);

        if (index > -1) {
            wishlist.splice(index, 1);
            btn.classList.remove('liked');
        } else {
            wishlist.push({ id, title });
            btn.classList.add('liked');
        }
        updateWishlist();
    });
});

function updateCart() {
    const container = $('cart_items_container');
    container.innerHTML = cart.length ? '' : '<p class="empty_cart_text">Savatchangiz bo\'sh</p>';
    let total = 0, count = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
        count += item.qty;
        container.innerHTML += `
            <div class="cart_item_card">
                <div class="cart_item_info">
                    <h4>${item.title}</h4>
                    <span>$${item.price * item.qty}</span>
                </div>
                <div class="cart_item_actions">
                    <button class="qty_btn" onclick="changeQty('${item.id}', -1)">-</button>
                    <span>${item.qty}</span>
                    <button class="qty_btn" onclick="changeQty('${item.id}', 1)">+</button>
                    <button class="remove_item_btn" onclick="removeItem('${item.id}')"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>`;
    });
    $('cart_count').textContent = `Savatcha (${count})`;
    $('cart_total_price').textContent = `$${total}`;
}

function updateWishlist() {
    const container = $('wish_items_container');
    container.innerHTML = wishlist.length ? '' : '<p class="empty_cart_text">Yoqgan ruchkalar yo\'q</p>';
    wishlist.forEach(item => {
        container.innerHTML += `
            <div class="cart_item_card">
                <div class="cart_item_info">
                    <h4>${item.title}</h4>
                </div>
                <button class="remove_item_btn" onclick="removeWish('${item.id}')"><i class="fa-solid fa-trash"></i></button>
            </div>`;
    });
    $('wish_count').textContent = `Likes (${wishlist.length})`;
}

window.changeQty = (id, delta) => {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
        updateCart();
    }
};

window.removeItem = id => {
    cart = cart.filter(i => i.id !== id);
    updateCart();
};

window.removeWish = id => {
    wishlist = wishlist.filter(i => i.id !== id);
    document.querySelectorAll('.box28').forEach(card => {
        if (card.dataset.id === id) card.querySelector('.wishlist_overlay_btn').classList.remove('liked');
    });
    updateWishlist();
};

$('box13_checkout')?.addEventListener('click', () => {
    if (!cart.length) return;
    const btn = $('box13_checkout');
    btn.innerHTML = 'Zakas qilindi <span class="cyan_light_dot"></span>';
    setTimeout(() => {
        cart = [];
        updateCart();
        btn.textContent = 'Zakas qilish';
        toggleDrawer($('box75_cart'));
    }, 2000);
});

document.querySelectorAll('.faq_question').forEach(q => {
    q.addEventListener('click', () => q.parentElement.classList.toggle('active'));
});

$('box41_input')?.addEventListener('input', e => {
    $('box40_text').textContent = e.target.value.trim() || 'ISMINGIZ';
});

document.querySelectorAll('.box62').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.box62').forEach(b => b.classList.remove('box62_active'));
        btn.classList.add('box62_active');
    });
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('animated');
    });
}, { threshold: 0.15 });

document.querySelectorAll('.animate-left, .animate-right, .animate-up').forEach(el => observer.observe(el));