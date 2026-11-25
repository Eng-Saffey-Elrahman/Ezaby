/**
 * ==============================================================================
 * نظام إدارة صيدليات العزبي - ملف التحكم في واجهة الموقع (app.js)
 * كود بسيط جداً للتحكم في الشريط العلوي والقائمة الجانبية والساعة
 * ==============================================================================
 */

// عند اكتمال تحميل عناصر الصفحة في المتصفح
document.addEventListener('DOMContentLoaded', function() {
  
  // 1. جلب بيانات الموظف والفرع الحالي المسجل دخوله
  var currentUser = getCurrentUser();

  // 2. عرض اسم الموظف ووظيفته في القائمة الجانبية
  var userNameEl = document.getElementById('sidebar-user-name');
  var userRoleEl = document.getElementById('sidebar-user-role');
  if (userNameEl) {
    userNameEl.textContent = currentUser.employee_name;
  }
  if (userRoleEl) {
    userRoleEl.textContent = currentUser.job_title + ' (فرع #' + currentUser.branch_id + ')';
  }

  // 3. عرض اسم الفرع الحالي في الشريط العلوي (Topbar)
  var branchBadgeEl = document.getElementById('topbar-branch-badge');
  if (branchBadgeEl) {
    branchBadgeEl.textContent = '🏥 ' + currentUser.branch_name;
  }

  // 4. تشغيل الساعة الرقمية في الشريط العلوي
  var clockEl = document.getElementById('topbar-clock');
  if (clockEl) {
    setInterval(function() {
      var now = new Date();
      clockEl.textContent = now.toLocaleTimeString('ar-EG');
    }, 1000);
  }

});
