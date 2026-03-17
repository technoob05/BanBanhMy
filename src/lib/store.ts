import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
    id: string;
    email: string;
    name: string;
    address?: string;
    phone?: string;
    birthday?: string;
    gender?: 'nam' | 'nu' | 'khac';
}

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    status: 'pending' | 'processing' | 'shipping' | 'delivered';
    date: string;
    paymentMethod?: 'cod' | 'digital';
    trackingSteps: {
        status: string;
        time: string;
        description: string;
        completed: boolean;
    }[];
}

interface CartStore {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

interface AuthStore {
    user: User | null;
    setUser: (user: User | null) => void;
    updateUser: (data: Partial<User>) => void;
    logout: () => void;
}

interface OrderStore {
    orders: Order[];
    placeOrder: (paymentMethod?: Order['paymentMethod']) => Order | null;
    updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

type CombinedStore = CartStore & AuthStore & OrderStore;

export const useStore = create<CombinedStore>()(
    persist(
        (set, get) => ({
            // Cart implementation
            items: [],
            addItem: (product) => {
                const { items } = get();
                const existingItem = items.find((item) => item.id === product.id);
                if (existingItem) {
                    set({
                        items: items.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    });
                } else {
                    set({ items: [...items, { ...product, quantity: 1 }] });
                }
            },
            removeItem: (productId) => {
                set({ items: get().items.filter((item) => item.id !== productId) });
            },
            updateQuantity: (productId, quantity) => {
                if (quantity === 0) {
                    get().removeItem(productId);
                } else {
                    set({
                        items: get().items.map((item) =>
                            item.id === productId ? { ...item, quantity } : item
                        ),
                    });
                }
            },
            clearCart: () => set({ items: [] }),
            getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
            getTotalPrice: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),

            // Auth implementation
            user: null,
            setUser: (user) => set({ user }),
            updateUser: (data) => {
                const { user } = get();
                if (user) {
                    set({ user: { ...user, ...data } });
                }
            },
            logout: () => set({ user: null }),

            // Order implementation
            orders: [],
            placeOrder: (paymentMethod) => {
                const { items, getTotalPrice, clearCart } = get();
                if (items.length === 0) return null;

                const newOrder: Order = {
                    id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                    items: [...items],
                    total: getTotalPrice(),
                    status: 'pending',
                    date: new Date().toISOString(),
                    paymentMethod: paymentMethod || 'cod',
                    trackingSteps: [
                        { status: 'pending', time: new Date().toISOString(), description: 'Đơn hàng đã được tiếp nhận', completed: true },
                        { status: 'processing', time: '', description: 'Đang chuẩn bị hàng', completed: false },
                        { status: 'shipping', time: '', description: 'Đang giao hàng', completed: false },
                        { status: 'delivered', time: '', description: 'Giao hàng thành công', completed: false },
                    ]
                };

                set({
                    orders: [newOrder, ...get().orders],
                });
                clearCart();
                return newOrder;
            },
            updateOrderStatus: (orderId, status) => {
                set({
                    orders: get().orders.map(order => 
                        order.id === orderId ? { ...order, status } : order
                    )
                });
            }
        }),
        {
            name: 'noodliverse-storage',
        }
    )
);

// Backward compatibility for existing code using useCartStore
export const useCartStore = useStore;

