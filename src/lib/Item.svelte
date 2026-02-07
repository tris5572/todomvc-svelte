<script lang="ts">
  import type { Todo } from "./types";

  let { todo = $bindable() }: { todo: Todo } = $props();
</script>

<div>
  <input type="checkbox" bind:checked={todo.completed} />
  {todo.title}
</div>
