<script lang="ts">
  import Item from "./lib/Item.svelte";
  import type { Todo } from "./lib/types";

  let todos = $state<Todo[]>([
    { id: 1, title: "Example Todo Item", completed: false },
    { id: 2, title: "サンプルtodo", completed: true },
  ]);

  /** 指定した ID の TODO アイテムを削除する */
  function deleteTodo(id: number) {
    todos = todos.filter((t) => t.id !== id);
  }
</script>

<main>
  <div>
    <!-- `#each todos as todo` だと、todo が一時的な参照になって更新できないためインデックスアクセスする -->
    {#each todos as _, i}
      <Item bind:todo={todos[i]} onDelete={deleteTodo} />
    {/each}
  </div>
</main>

<style>
</style>
