<script lang="ts">
  import type { Todo } from "./types";

  let {
    todo = $bindable(),
    onDelete,
  }: { todo: Todo; onDelete: (id: number) => void } = $props();
</script>

<div>
  <input type="checkbox" bind:checked={todo.completed} />
  {todo.title}
  <button onclick={() => onDelete(todo.id)}>✗</button>
</div>
