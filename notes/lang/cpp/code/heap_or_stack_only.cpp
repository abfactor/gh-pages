#include <memory>
#include <iostream>
// #include <new>

class HeapOnly {
public:
    
    static std::unique_ptr<HeapOnly, void(*)(HeapOnly*)> create() {
        return {
            new HeapOnly(),
            [](HeapOnly *ptr) {
                ptr->destory();
            }
        };
    }

    HeapOnly(const HeapOnly&) = delete;
    HeapOnly& operator=(const HeapOnly&) = delete;

private:
    void destory() {
        std::cout << "destory" << std::endl;
        delete this;
    }
    HeapOnly() = default;
    ~HeapOnly() {
        std::cout << "~HeapOnly" << std::endl;
    };
};

class StackOnly {
public:

    explicit StackOnly() = default;
    ~StackOnly() = default;

    void * operator new(size_t) = delete;          // new
    void * operator new[](size_t) = delete;        // new []
    void * operator new(size_t, void*) = delete;   // placement new (貌似不删除也没办法用了)
    /* placement new
        void *ptr = malloc(sizeof(StackOnly));
        StackOnly *obj = new (ptr) StackOnly;
        obj->~StackOnly();
        free(ptr);
    */
};

int main() {

    {
        auto heap_only = HeapOnly::create();
        // heap_only->destory();
        // TODO: 如果 destory() 为 public 怎么解决 double free?
    }

    std::cout << "out of scope" << std::endl;

    // void *ptr = malloc(sizeof(StackOnly));
    // StackOnly *obj = new(ptr) StackOnly;
    // obj->~StackOnly();
    // free(ptr);
}