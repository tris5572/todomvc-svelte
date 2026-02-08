<script lang="ts">
  import type { KeyboardEventHandler } from "svelte/elements";
  import type { Todo } from "./types";

  type Props = {
    todo: Todo;
    onDelete: (id: number) => void;
    editTodoTitle: (id: number, title: string) => void;
  };

  let { todo = $bindable(), onDelete, editTodoTitle }: Props = $props();
  let isEditing = $state(false);

  function handleInputBlur() {
    isEditing = false;
  }

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      const newTitle = e.currentTarget.value.trim();
      if (newTitle === "") {
        onDelete(todo.id); // 空文字列なら削除
      } else {
        editTodoTitle(todo.id, newTitle); // タイトルを編集
      }
      isEditing = false;
    }
  };
</script>

<div>
  {#if isEditing}
    <!-- svelte-ignore a11y_autofocus -->
    <input
      type="text"
      autofocus
      defaultValue={todo.title}
      onblur={handleInputBlur}
      onkeydown={handleKeyDown}
    />
  {:else}
    <input type="checkbox" bind:checked={todo.completed} />
    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label ondblclick={() => (isEditing = true)}>{todo.title}</label>
    <button onclick={() => onDelete(todo.id)}>✗</button>
  {/if}
</div>
