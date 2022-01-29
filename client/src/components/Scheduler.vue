<template>
  <div ref="scheduler"></div>
</template>
 
<script>
import "dhtmlx-scheduler";

export default {
  name: "scheduler",
  props: {
    events: {
      type: Array,
      default() {
        return events;
      },
    },
  },
  mounted: function () {
    scheduler.skin = "material";
    scheduler.config.header = [
      "day",
      "week",
      "month",
      "date",
      "prev",
      "today",
      "next",
    ];
    console.log('dfasjh ') // Mejorar el calendario
    scheduler.init(this.$refs.scheduler, new Date(2021, 0, 20), "month");
    scheduler.attachEvent("onEventAdded", (id, ev) => {
      this.$emit("event-updated", id, "inserted", ev);
    });
    scheduler.attachEvent("onEventChanged", (id, ev) => {
      this.$emit("event-updated", id, "updated", ev);
    });
    scheduler.attachEvent("onEventDeleted", (id, ev) => {
      this.$emit("event-updated", id, "deleted");
    });
  },
};
</script>
 
<style>
@import "~dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css";
</style>