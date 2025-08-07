import { create } from 'zustand';

export let useTotal=create((set) => ({
    totalCount:0,
    setTotalCount:(newCount) => set({
        totalCount:newCount
    })
}))


// const useTotal = create((set) => ({
//   totalCount: 0,
//   setTotalCount: (newCounter) => set({ totalCount: newCounter }),
// }));