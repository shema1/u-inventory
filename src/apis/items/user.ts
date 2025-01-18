import { createApi } from "@reduxjs/toolkit/query/react";
import { IItem } from "./interfaces";
import getBaseQuery from "../baseQuery/baseQuery";


export const items = createApi({
    baseQuery: getBaseQuery,
    reducerPath: "items",
    tagTypes: ["Item"],
    endpoints: (builder) => ({
        // Отримати всі елементи
        getItems: builder.query<IItem[], void>({
            query: () => "/item",
            providesTags: (result) =>
                result
                  ? [
                      ...result.map(({ itemId }) => ({ type: "Item" as const, id: itemId })),
                      { type: "Item", id: "LIST" },
                    ]
                  : [{ type: "Item", id: "LIST" }],
        }),

        // Отримати один елемент за ID
        getItem: builder.query<IItem, string>({
            query: (id) => `/item/${id}`,
            providesTags: (result, error, id) => [{ type: "Item", id }],
        }),

        // Створити новий елемент
        createItem: builder.mutation<IItem, Partial<IItem>>({
            query: (newItem) => ({
                url: "/item",
                method: "POST",
                body: newItem,
            }),
            invalidatesTags: [{ type: "Item", id: "LIST" }], // Скидає кеш для списку елементів
        }),

        // Оновити елемент за ID
        updateItem: builder.mutation<IItem, { id: string; updatedItem: Partial<IItem> }>({
            query: ({ id, updatedItem }) => ({
                url: `/item/${id}`,
                method: "PUT",
                body: updatedItem,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Item", id }], // Скидає кеш для оновленого елемента
        }),

        // Видалити елемент за ID
        deleteItem: builder.mutation<void, string>({
            query: (id) => ({
                url: `/item/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [{ type: "Item", id }, { type: "Item", id: "LIST" }], // Скидає кеш
        }),
    })
})

export const {useLazyGetItemsQuery } = items