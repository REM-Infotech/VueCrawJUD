<template>
  <div class="p-6">
    <button
      @click="openModal()"
      class="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Adicionar Usuário
    </button>

    <table class="min-w-full bg-white border">
      <thead>
        <tr class="bg-gray-100 text-left">
          <th class="py-2 px-4 border">Nome</th>
          <th class="py-2 px-4 border">Email</th>
          <th class="py-2 px-4 border">Permissão</th>
          <th class="py-2 px-4 border text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index" class="hover:bg-gray-50">
          <td class="py-2 px-4 border">{{ user.name }}</td>
          <td class="py-2 px-4 border">{{ user.email }}</td>
          <td class="py-2 px-4 border">{{ user.role }}</td>
          <td class="py-2 px-4 border text-center space-x-2">
            <button @click="editUser(index)" class="text-blue-600 hover:underline">Editar</button>
            <button @click="deleteUser(index)" class="text-red-600 hover:underline">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-lg font-bold mb-4">
          {{ isEditing ? "Editar Usuário" : "Adicionar Usuário" }}
        </h2>

        <div class="mb-3">
          <label class="block text-sm">Nome:</label>
          <input v-model="form.name" class="w-full border px-3 py-2 rounded" />
        </div>
        <div class="mb-3">
          <label class="block text-sm">Email:</label>
          <input v-model="form.email" class="w-full border px-3 py-2 rounded" />
        </div>
        <div class="mb-4">
          <label class="block text-sm">Permissão:</label>
          <select v-model="form.role" class="w-full border px-3 py-2 rounded">
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="leitor">Leitor</option>
          </select>
        </div>

        <div class="flex justify-end space-x-2">
          <button @click="closeModal" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancelar
          </button>
          <button
            @click="saveUser"
            class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const users = ref([
  { name: "Maria Silva", email: "maria@email.com", role: "admin" },
  { name: "João Souza", email: "joao@email.com", role: "editor" },
]);

const showModal = ref(false);
const isEditing = ref(false);
const editingIndex = ref(null);

const form = reactive({
  name: "",
  email: "",
  role: "leitor",
});

function openModal() {
  resetForm();
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  isEditing.value = false;
  editingIndex.value = null;
}

function resetForm() {
  form.name = "";
  form.email = "";
  form.role = "leitor";
}

function saveUser() {
  if (isEditing.value && editingIndex.value !== null) {
    users.value[editingIndex.value] = { ...form };
  } else {
    users.value.push({ ...form });
  }
  closeModal();
}

function editUser(index) {
  editingIndex.value = index;
  const user = users.value[index];
  form.name = user.name;
  form.email = user.email;
  form.role = user.role;
  isEditing.value = true;
  showModal.value = true;
}

function deleteUser(index) {
  if (confirm("Deseja excluir este usuário?")) {
    users.value.splice(index, 1);
  }
}
</script>

<style scoped>
/* Você pode adicionar estilos extras aqui se desejar */
</style>
