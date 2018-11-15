<template>
  <div>
    <header>
      <router-link :to="{ name: 'create' }">Nieuwe lijst</router-link>
      <button class="pick" @click="pick">Pick!</button>
    </header>
    <ul>
      <li class="item" v-for="(item, index) in items" :key="index">
        {{ item.body }}
        <button class="remove" @click="remove(item);">Verwijder</button>
      </li>
    </ul>

    <div class="input-group">
      <input
        type="text"
        v-model="newItem"
        @keyup.enter="add"
        placeholder="Voeg idee toe"
      />
      <button class="add" @click="add">Voeg toe</button>
    </div>
  </div>
</template>

<style scoped>
ul {
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.25rem;

  box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.2);
}

.input-group {
  display: flex;
  box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.2);
  border-radius: 0.25rem;
}

input {
  font-size: 1rem;
  border-radius: 0;
}

input,
button {
  padding: 0.5rem;
  border: 0;
  background: transparent;
}

.remove {
  font-size: 75%;
  color: #af5b4c;
}

.input-group input {
  flex: 1 1 auto;
  border-radius: 0.25rem;
}

.input-group button {
  background-color: #4caf8c;

  border-radius: 0.25rem;
  margin: 0.25rem;
  color: #fff;
}

header {
  margin-right: -0.5rem;
  margin-left: -0.5rem;
  padding: 0.5rem;
  padding-top: 0;
  margin-bottom: 1rem;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: solid 1px #eee;
}

header > *:not(:last-child) {
  margin-right: 0.5rem;
}

a {
  color: #4caf8c;
}

.pick {
  background-color: #b0b0b0;
  color: #fff;
  border-radius: 0.25rem;
}
</style>

<script>
import { db } from "../config/db.js";

export default {
  name: "home",
  data() {
    return {
      id: this.$route.params.id,
      items: [],
      newItem: ""
    };
  },
  created() {
    if (!this.id) {
      return;
    }

    this.$bind(
      "items",
      db
        .collection("lists")
        .doc(this.id)
        .collection("items")
    );
  },
  methods: {
    add() {
      if (!this.newItem) {
        return;
      }

      if (!this.id) {
        let test = db.collection("lists").doc();

        this.id = test.id;

        this.$router.push({ name: "list", params: { id: test.id } });

        db.collection("lists")
          .doc(test.id)
          .collection("items")
          .add({
            body: this.newItem,
            created: firebase.firestore.FieldValue.serverTimestamp()
          });
      } else {
        db.collection("lists")
          .doc(this.id)
          .collection("items")
          .add({
            body: this.newItem,
            created: firebase.firestore.FieldValue.serverTimestamp()
          });
      }

      this.newItem = "";
    },

    remove(item) {
      db.collection("lists")
        .doc(this.id)
        .collection("items")
        .doc(item.id)
        .delete();
    },

    pick() {
      let randomIndex = Math.floor(Math.random() * this.items.length);

      alert(this.items[randomIndex].body);
    }
  },
  computed: {
    canPick() {
      return this.items.length > 1;
    }
  },
  watch: {
    $route(to) {
      if (!to.params.id) {
        this.id = null;

        return;
      }

      this.id = to.params.id;
    },
    id() {
      if (!this.id) {
        this.$unbind("items");
        this.items = [];

        return;
      }

      this.$bind(
        "items",
        db
          .collection("lists")
          .doc(this.id)
          .collection("items")
      );
    }
  }
};
</script>
