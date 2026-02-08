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
    <div class="container">
      <div class="input">
        <input
          type="text"
          autofocus
          defaultValue={todo.title}
          onblur={handleInputBlur}
          onkeydown={handleKeyDown}
        />
      </div>
    </div>
  {:else}
    <div class="container">
      <div class="check">
        <label><input type="checkbox" bind:checked={todo.completed} /></label>
      </div>
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="title" ondblclick={() => (isEditing = true)}>
        {todo.title}
      </div>
      <div class="delete">
        <button onclick={() => onDelete(todo.id)}>✗</button>
      </div>
    </div>
  {/if}
</div>

<style>
  .container {
    font-size: 1.2rem;
    background: var(--white);
    height: 3rem;
    display: flex;
    align-items: center;
    border-radius: 2px;

    .check {
      flex-grow: 0;
      padding: 0 0.5rem;
    }

    .title {
      flex-grow: 1;
    }

    .delete {
      flex-grow: 0;
      padding: 0 0.5rem;
    }

    .input {
      padding: 0 1rem;
      max-width: 100%;

      input {
        width: 50rem;
        max-width: 100%;
        font-size: 1.2rem;
      }
    }
  }

  input[type="checkbox"] {
    display: none;
  }
  label:has(input[type="checkbox"])::before {
    content: "";
    width: 20px;
    height: 20px;
    border: 1px solid var(--brand);
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  label:has(input[type="checkbox"]:checked)::before {
    content: "✔";
    background: var(--brand);
    color: white;
  }
</style>
