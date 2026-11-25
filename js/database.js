/**
 * ==============================================================================
 * نظام إدارة صيدليات العزبي - ملف قاعدة البيانات المحلي (database.js)
 * كود مبسط جداً ومشروح خطوة بخطوة باللغة العربية
 * يقوم هذا الملف بمحاكاة جداول قاعدة بيانات SQL وحفظ البيانات في المتصفح (localStorage)
 * ==============================================================================
 */

// دالة مساعدة لجلب أي جدول من التخزين
function getTable(tableName) {
  // نقرأ النص المخزن ونحوله إلى مصفوفة (Array)
  var data = localStorage.getItem('sql_' + tableName);
  if (data) {
    return JSON.parse(data);
  }
  return [];
}

// دالة مساعدة لحفظ أي جدول في التخزين
function saveTable(tableName, dataArray) {
  // نحول المصفوفة إلى نص ونخزنها
  localStorage.setItem('sql_' + tableName, JSON.stringify(dataArray));
}

// دالة تهيئة البيانات الأولية (مطابقة لبيانات ملف SQLQuery1.sql)
function initDatabase() {
  // إذا كانت البيانات مسجلة مسبقاً، لا داعي لإعادة إدخالها
  if (localStorage.getItem('database_initialized')) {
    return;
  }

  // 1. جدول المخازن المركزية (CENTRAL_WAREHOUSE)
  var warehouses = [
    { warehouse_id: 1, warehouse_name: 'مستودع العزبي الرئيسي - مدينة نصر', capacity: 100000, governorate: 'القاهرة', city: 'مدينة نصر', street: 'شارع الطيران' },
    { warehouse_id: 2, warehouse_name: 'مستودع الدلتا اللوجستي - طنطا', capacity: 75000, governorate: 'الغربية', city: 'طنطا', street: 'طريق طنطا الإسكندرية' },
    { warehouse_id: 3, warehouse_name: 'مستودع الإسكندرية الإقليمي - سموحة', capacity: 80000, governorate: 'الإسكندرية', city: 'سموحة', street: 'شارع فوزي معاذ' },
    { warehouse_id: 4, warehouse_name: 'مستودع الجيزة المركزي - أكتوبر', capacity: 95000, governorate: 'الجيزة', city: '6 أكتوبر', street: 'المنطقة الصناعية' },
    { warehouse_id: 7, warehouse_name: 'مستودع مخزون الطوارئ - العبور', capacity: 90000, governorate: 'القليوبية', city: 'العبور', street: 'المنطقة الأولى' }
  ];

  // 2. جدول الموردين (SUPPLIER) وأرقام هواتفهم (SUPPLIER_PHONE)
  var suppliers = [
    { supplier_id: 1, company_name: 'شركة فايزر مصر للأدوية', email: 'info@pfizer.com.eg', governorate: 'القاهرة', city: 'مصر الجديدة', street: 'شارع الأهرام', warehouse_id: 1, phones: ['0224849300', '0224849301'] },
    { supplier_id: 2, company_name: 'إيفا فارما للأدوية', email: 'contact@eva.pharma', governorate: 'الجيزة', city: 'الهرم', street: 'شارع المنصورية', warehouse_id: 4, phones: ['0233857200'] },
    { supplier_id: 3, company_name: 'شركة أمون للأدوية', email: 'sales@amoun.com', governorate: 'القاهرة', city: 'مدينة نصر', street: 'المنطقة الحرة', warehouse_id: 1, phones: ['0222634500'] },
    { supplier_id: 4, company_name: 'مجموعة فاركو الطبية', email: 'supply@pharco.org', governorate: 'الإسكندرية', city: 'العامرية', street: 'المنطقة الصناعية', warehouse_id: 3, phones: ['034700500'] },
    { supplier_id: 9, company_name: 'جلاكسو سميثكلاين مصر', email: 'info@glaxo.com.eg', governorate: 'القاهرة', city: 'مدينة السلام', street: 'طريق بلبيس', warehouse_id: 7, phones: ['0226567100'] }
  ];

  // 3. جدول الأدوية (MEDICINE) وموادها الفعالة (MEDICINE_INGREDIENT)
  var medicines = [
    { medicine_id: 1, medicine_name: 'Panadol Advance 500mg', medicine_type: 'Analgesic', active_ingredient: 'Paracetamol', price: 35.00, expiry_date: '2028-12-01', supplier_id: 1, warehouse_id: 1 },
    { medicine_id: 2, medicine_name: 'Augmentin 1g Tablets', medicine_type: 'Antibiotic', active_ingredient: 'Amoxicillin', price: 120.00, expiry_date: '2027-06-15', supplier_id: 9, warehouse_id: 7 },
    { medicine_id: 3, medicine_name: 'Cataflam 50mg', medicine_type: 'Anti-inflammatory', active_ingredient: 'Diclofenac', price: 55.00, expiry_date: '2028-03-20', supplier_id: 1, warehouse_id: 1 },
    { medicine_id: 4, medicine_name: 'Concor 5mg Plus', medicine_type: 'Antihypertensive', active_ingredient: 'Bisoprolol', price: 48.50, expiry_date: '2029-01-10', supplier_id: 2, warehouse_id: 4 },
    { medicine_id: 5, medicine_name: 'Antinal Capsules', medicine_type: 'Antidiarrheal', active_ingredient: 'Nifuroxazide', price: 32.00, expiry_date: '2026-12-20', supplier_id: 2, warehouse_id: 4 },
    { medicine_id: 6, medicine_name: 'Amoxicillin 500mg', medicine_type: 'Antibiotic', active_ingredient: 'Amoxicillin', price: 28.00, expiry_date: '2027-09-14', supplier_id: 1, warehouse_id: 1 },
    { medicine_id: 7, medicine_name: 'Brufen 400mg', medicine_type: 'Analgesic', active_ingredient: 'Ibuprofen', price: 42.00, expiry_date: '2028-08-25', supplier_id: 4, warehouse_id: 3 },
    { medicine_id: 8, medicine_name: 'Lipitor 20mg', medicine_type: 'Cholesterol', active_ingredient: 'Atorvastatin', price: 210.00, expiry_date: '2026-05-10', supplier_id: 1, warehouse_id: 1 }
  ];

  // 4. جدول الفروع (BRANCH)
  var branches = [
    { branch_id: 1, branch_name: 'فرع العزبي - مدينة نصر الرئيسي', branch_status: 'نشط', phone: '0224012345', governorate: 'القاهرة', city: 'مدينة نصر', street: 'شارع الطيران', warehouse_id: 1, employee_id: 1, manager_name: 'محمود رأفت علي', manager_start_date: '2015-01-15' },
    { branch_id: 2, branch_name: 'فرع العزبي - الدقي التحرير', branch_status: 'نشط', phone: '0233356789', governorate: 'الجيزة', city: 'الدقي', street: 'شارع التحرير', warehouse_id: 4, employee_id: 9, manager_name: 'نهى شفيق زاهر', manager_start_date: '2021-10-05' },
    { branch_id: 3, branch_name: 'فرع العزبي - سموحة فوزي معاذ', branch_status: 'نشط', phone: '034201122', governorate: 'الإسكندرية', city: 'سموحة', street: 'شارع فوزي معاذ', warehouse_id: 3, employee_id: 19, manager_name: 'عمرو وجدي الحكيم', manager_start_date: '2023-09-01' }
  ];

  // 5. جدول الموظفين (EMPLOYEE)
  var employees = [
    { employee_id: 1, employee_name: 'محمود رأفت علي', national_id: '29501010101234', hire_date: '2015-01-15', phone: '01011112222', job_title: 'مدير فرع', salary: 15000.00, branch_id: 1, branch_name: 'فرع العزبي - مدينة نصر الرئيسي' },
    { employee_id: 2, employee_name: 'محمد أحمد حسن', national_id: '29602020202345', hire_date: '2016-03-20', phone: '01122223333', job_title: 'صيدلي أول', salary: 12000.00, branch_id: 1, branch_name: 'فرع العزبي - مدينة نصر الرئيسي' },
    { employee_id: 3, employee_name: 'عبد الرحمن محمد', national_id: '29703030303456', hire_date: '2017-06-10', phone: '01233334444', job_title: 'صيدلي ثان', salary: 9500.00, branch_id: 1, branch_name: 'فرع العزبي - مدينة نصر الرئيسي' },
    { employee_id: 7, employee_name: 'خالد عثمان الجيار', national_id: '29307070707890', hire_date: '2020-05-25', phone: '01277778888', job_title: 'طيار دليفري', salary: 5500.00, branch_id: 1, branch_name: 'فرع العزبي - مدينة نصر الرئيسي' }
  ];

  // 6. جدول العملاء (CUSTOMER)
  var customers = [
    { customer_id: 1, customer_name: 'أحمد محمد علي زكي', phone: '01012345678', loyalty_points: 150, governorate: 'القاهرة', city: 'مدينة نصر', street: 'شارع عباس العقاد' },
    { customer_id: 2, customer_name: 'سارة مصطفى حسن عبد الله', phone: '01122334455', loyalty_points: 320, governorate: 'الجيزة', city: 'الدقي', street: 'شارع مصدق' },
    { customer_id: 3, customer_name: 'محمد عبد الرحمن محمود', phone: '01233445566', loyalty_points: 75, governorate: 'الإسكندرية', city: 'سموحة', street: 'شارع ألبرت الأول' }
  ];

  // 7. جدول مخزون الفرع (BRANCH_INVENTORY)
  var inventory = [
    { inventory_id: 1, branch_id: 1, medicine_id: 1, medicine_name: 'Panadol Advance 500mg', available_quantity: 150, reorder_level: 20, shelf_location: 'الرف أ-١', expiry_date_batch: '2028-12-01', price: 35.00 },
    { inventory_id: 2, branch_id: 1, medicine_id: 2, medicine_name: 'Augmentin 1g Tablets', available_quantity: 10, reorder_level: 15, shelf_location: 'الرف ب-٣', expiry_date_batch: '2027-06-15', price: 120.00 }, // كمية أقل من حد الطلب (نواقص)!
    { inventory_id: 3, branch_id: 1, medicine_id: 3, medicine_name: 'Cataflam 50mg', available_quantity: 120, reorder_level: 25, shelf_location: 'الرف أ-٢', expiry_date_batch: '2028-03-20', price: 55.00 },
    { inventory_id: 4, branch_id: 1, medicine_id: 4, medicine_name: 'Concor 5mg Plus', available_quantity: 5, reorder_level: 10, shelf_location: 'الرف ج-١', expiry_date_batch: '2029-01-10', price: 48.50 }, // كمية أقل من حد الطلب!
    { inventory_id: 5, branch_id: 1, medicine_id: 5, medicine_name: 'Antinal Capsules', available_quantity: 200, reorder_level: 30, shelf_location: 'الرف د-٢', expiry_date_batch: '2026-12-20', price: 32.00 }, // قريب الانتهاء
    { inventory_id: 8, branch_id: 1, medicine_id: 8, medicine_name: 'Lipitor 20mg', available_quantity: 45, reorder_level: 10, shelf_location: 'الرف ج-٥', expiry_date_batch: '2026-05-10', price: 210.00 } // منتهي الصلاحية
  ];

  // 8. جدول الفواتير السابقة (INVOICE)
  var invoices = [
    { invoice_id: 1, invoice_date: '2026-11-25 09:15:00', total_amount: 150.00, payment_method: 'نقدي', employee_id: 1, employee_name: 'محمود رأفت علي', branch_id: 1, customer_id: 1, customer_name: 'أحمد محمد علي زكي', items_count: 2 },
    { invoice_id: 2, invoice_date: '2026-11-25 10:30:12', total_amount: 240.00, payment_method: 'فيزا', employee_id: 2, employee_name: 'محمد أحمد حسن', branch_id: 1, customer_id: 2, customer_name: 'سارة مصطفى حسن عبد الله', items_count: 1 }
  ];

  // 9. جدول طلبات التوصيل (DELIVERY_ORDER)
  var deliveries = [
    { delivery_id: 1, invoice_id: 1, driver_name: 'كابتن خالد عثمان الجيار', delivery_status: 'تم التوصيل', departure_time: '2026-11-25 09:30:00', delivery_fees: 15.00, customer_signature: 'أحمد محمد', customer_name: 'أحمد محمد علي زكي' },
    { delivery_id: 2, invoice_id: 2, driver_name: 'كابتن خالد عثمان الجيار', delivery_status: 'في الطريق', departure_time: '2026-11-25 10:45:00', delivery_fees: 20.00, customer_signature: '', customer_name: 'سارة مصطفى حسن عبد الله' }
  ];

  // حفظ الجداول كلها في الـ localStorage
  saveTable('CENTRAL_WAREHOUSE', warehouses);
  saveTable('SUPPLIER', suppliers);
  saveTable('MEDICINE', medicines);
  saveTable('BRANCH', branches);
  saveTable('EMPLOYEE', employees);
  saveTable('CUSTOMER', customers);
  saveTable('BRANCH_INVENTORY', inventory);
  saveTable('INVOICE', invoices);
  saveTable('DELIVERY_ORDER', deliveries);

  // تعيين علامة تأكيد التهيئة
  localStorage.setItem('database_initialized', 'true');
}

// دالة لمعرفة المستخدم والموظف الحالي المسجل دخوله
function getCurrentUser() {
  var userText = localStorage.getItem('current_logged_user');
  if (userText) {
    return JSON.parse(userText);
  }
  // مستخدم افتراضي إذا لم يسجل الدخول بعد
  return {
    employee_id: 1,
    employee_name: "محمود رأفت علي",
    job_title: "مدير فرع",
    branch_id: 1,
    branch_name: "فرع العزبي - مدينة نصر الرئيسي"
  };
}

// دالة لتسجيل دخول الموظف وحفظ بياناته في الجلسة
function setCurrentUser(userObj) {
  localStorage.setItem('current_logged_user', JSON.stringify(userObj));
}

// دالة تسجيل الخروج
function logoutUser() {
  if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
    localStorage.removeItem('current_logged_user');
    window.location.href = '../login.html';
  }
}

// تشغيل التهيئة فور تحميل الصفحة
initDatabase();
