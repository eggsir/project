import { Ionicons } from "@expo/vector-icons"
import { Tabs } from 'expo-router'
import React from 'react'
import { TaskProvider } from "../../context/TaskContext";

const TabsLayout = () => {
  return (
    <TaskProvider>
      <Tabs screenOptions={{
        tabBarActiveTintColor:"#e66091",
        tabBarInactiveTintColor:"#c9a5b2",
        tabBarStyle:{
            backgroundColor: "#ffe7e7",
            height: 90,
            paddingBottom: 30,
            paddingTop: 10,
        },
        tabBarLabelStyle:{
            fontSize: 12,
            fontWeight: "600",
        },
        headerShown:false,
      }}>
        <Tabs.Screen
            name='index'
            options={{
                title:"Tasks",
                tabBarIcon:({color,size}) => (
                    <Ionicons name='flash-outline' size={size} color={color} />
                )
            }}
        />
        <Tabs.Screen
            name='settings'
            options={{
                title:"Settings",
                tabBarIcon:({color,size}) => (
                    <Ionicons name='settings' size={size} color={color} />
                )
            }}
        />

      </Tabs>
    </TaskProvider>
  )
}

export default TabsLayout
